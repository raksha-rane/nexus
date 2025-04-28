import React, { createContext, useState, useContext } from 'react';

const BookingContext = createContext();

export const BookingProvider = ({ children }) => {
  const [bookedSessions, setBookedSessions] = useState([]);
  const [chatMessages, setChatMessages] = useState({});

  const isSlotAvailable = (newSession) => {
    return !bookedSessions.some(session => {
      // Convert dates to string for comparison
      const sessionDate = new Date(session.date).toDateString();
      const newSessionDate = new Date(newSession.date).toDateString();
      
      // Check if the slot conflicts with any existing booking
      const sameDateTime = sessionDate === newSessionDate && session.time === newSession.time;
      
      // Check if it's the same mentor or if the user has another session at the same time
      const conflictingBooking = session.mentorId === newSession.mentorId || 
                                (sessionDate === newSessionDate && session.time === newSession.time);
      
      return sameDateTime && conflictingBooking;
    });
  };

  const addBooking = (session) => {
    if (!isSlotAvailable(session)) {
      throw new Error('This slot is no longer available');
    }

    setBookedSessions(prev => [...prev, {
      ...session,
      createdAt: new Date().toISOString() // Add timestamp for sorting
    }]);

    setChatMessages(prev => ({
      ...prev,
      [session.id]: []
    }));
  };

  const removeBooking = (sessionId) => {
    setBookedSessions(prev => prev.filter(session => session.id !== sessionId));
    setChatMessages(prev => {
      const { [sessionId]: removed, ...rest } = prev;
      return rest;
    });
  };

  const getBookedSlotsByMentor = (mentorId, date) => {
    return bookedSessions
      .filter(session => {
        const sessionDate = new Date(session.date).toDateString();
        const queryDate = new Date(date).toDateString();
        return session.mentorId === mentorId && sessionDate === queryDate;
      })
      .map(session => session.time);
  };

  const getUserBookings = (date) => {
    return bookedSessions
      .filter(session => {
        const sessionDate = new Date(session.date).toDateString();
        const queryDate = new Date(date).toDateString();
        return sessionDate === queryDate;
      })
      .map(session => session.time);
  };

  const addMessage = (sessionId, message) => {
    setChatMessages(prev => ({
      ...prev,
      [sessionId]: [...(prev[sessionId] || []), message]
    }));
  };

  return (
    <BookingContext.Provider value={{ 
      bookedSessions, 
      addBooking, 
      removeBooking,
      chatMessages,
      addMessage,
      getBookedSlotsByMentor,
      getUserBookings,
      isSlotAvailable
    }}>
      {children}
    </BookingContext.Provider>
  );
};

export const useBookings = () => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBookings must be used within a BookingProvider');
  }
  return context;
};