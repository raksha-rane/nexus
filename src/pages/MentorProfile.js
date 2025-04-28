import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  TypingIndicator
} from '@chatscope/chat-ui-kit-react';
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import './MentorProfile.css';
import mentorsData from '../data/mentors.json';
import { useBookings } from '../data/BookingContext';

const MentorProfile = () => {
  const { 
    bookedSessions, 
    addBooking, 
    getBookedSlotsByMentor, 
    getUserBookings,
    isSlotAvailable,
    chatMessages,
    addMessage 
  } = useBookings();
  const { id } = useParams();
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [messages, setMessages] = useState([]);
  const [showChat, setShowChat] = useState(false);
  const [loading, setLoading] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [toast, setToast] = useState(null);
  const [currentSession, setCurrentSession] = useState(null);

  // Find mentor by ID from the data file
  const mentor = mentorsData.mentors.find(m => m.id === parseInt(id)) || {
    id: 0,
    name: 'Mentor not found',
    title: '',
    expertise: [],
    experience: '',
    photo: '',
    bio: '',
    availableSlots: []
  };

  useEffect(() => {
    // Check if user has a booked session with this mentor
    const session = bookedSessions.find(s => s.mentorId === parseInt(id));
    setCurrentSession(session);
    
    if (session) {
      setShowChat(true);
      // Load existing messages for this session
      const sessionMessages = chatMessages[session.id] || [];
      setMessages(sessionMessages);
    }
  }, [id, bookedSessions, chatMessages]);

  // Show toast message
  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  // Check if a slot is already booked
  const isSlotBooked = (date, time) => {
    const mentorBookings = getBookedSlotsByMentor(mentor.id, date);
    const userBookings = getUserBookings(date);
    
    return mentorBookings.includes(time) || userBookings.includes(time);
  };

  // Filter out past time slots and booked slots
  const getAvailableSlots = (selectedDate) => {
    if (!selectedDate) return [];
    
    const now = new Date();
    const selected = new Date(selectedDate);
    
    return mentor.availableSlots.filter(slot => {
      // If selected date is today, filter out past times
      if (selected.toDateString() === now.toDateString()) {
        const [slotHour, slotMinute] = slot.split(':').map(Number);
        const slotTime = new Date(selected);
        slotTime.setHours(slotHour, slotMinute);
        return slotTime > now && !isSlotBooked(selected, slot);
      }
      return !isSlotBooked(selected, slot);
    });
  };

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    setSelectedSlot(null);
    setBookingSuccess(false);
  };

  const handleSlotSelect = (slot) => {
    if (isSlotBooked(selectedDate, slot)) {
      showToast('This time slot is already booked. Please select another time.', 'error');
      return;
    }
    setSelectedSlot(slot);
    setBookingSuccess(false);
  };

  const handleBookSession = async () => {
    if (!selectedDate || !selectedSlot) {
      showToast('Please select both a date and time slot', 'error');
      return;
    }

    setLoading(true);
    
    try {
      const newSession = {
        id: Date.now(),
        mentorId: mentor.id,
        mentorName: mentor.name,
        mentorPhoto: mentor.photo,
        date: new Date(selectedDate.getTime() - (selectedDate.getTimezoneOffset() * 60000)).toISOString().split('T')[0],
        time: selectedSlot,
        topic: mentor.expertise[0],
        status: 'upcoming'
      };

      // Verify slot availability before booking
      if (!isSlotAvailable(newSession)) {
        showToast('This slot is no longer available. Please select another time.', 'error');
        return;
      }

      addBooking(newSession);
      setBookingSuccess(true);
      setShowChat(true);
      showToast('Session booked successfully! You can now chat with your mentor.', 'success');
      
      const welcomeMessage = {
        message: `Hi! I'm ${mentor.name}. I'm looking forward to our session on ${selectedDate.toDateString()} at ${selectedSlot}. Feel free to ask any questions before our meeting!`,
        sentTime: new Date().toLocaleTimeString(),
        sender: "mentor",
        direction: "incoming"
      };

      setMessages([welcomeMessage]);
    } catch (error) {
      showToast(error.message || 'Failed to book the session. Please try again.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleSendMessage = (messageText) => {
    if (!messageText.trim() || !currentSession) return;

    const userMessage = {
      message: messageText,
      sentTime: new Date().toLocaleTimeString(),
      sender: "user",
      direction: "outgoing"
    };

    // Add message to local state and context
    setMessages(prev => [...prev, userMessage]);
    addMessage(currentSession.id, userMessage);
    setIsTyping(true);

    // Simulate mentor typing and response
    setTimeout(() => {
      const mentorResponses = [
        "I'll make sure to address this in our session.",
        "That's a great question! We can discuss this in detail during our meeting.",
        "I have experience with similar situations, and I'd be happy to share my insights.",
        "Let me prepare some resources for our session to help with this.",
        "I understand your concerns, and we'll work on this together."
      ];

      const randomResponse = mentorResponses[Math.floor(Math.random() * mentorResponses.length)];
      
      const mentorMessage = {
        message: randomResponse,
        sentTime: new Date().toLocaleTimeString(),
        sender: "mentor",
        direction: "incoming"
      };

      setIsTyping(false);
      setMessages(prev => [...prev, mentorMessage]);
      addMessage(currentSession.id, mentorMessage);
    }, 2000);
  };

  // Determine if a date should be disabled
  const isPastDate = (date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today;
  };

  // Format time slot for display
  const formatTimeSlot = (slot) => {
    const [hour, minute] = slot.split(':');
    const time = new Date();
    time.setHours(parseInt(hour), parseInt(minute));
    return time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="mentor-profile-page">
      {toast && (
        <div className="toast-container">
          <div className={`toast ${toast.type}`}>
            <div className="toast-body p-3">
              {toast.type === 'error' ? '❌' : '✅'} {toast.message}
            </div>
          </div>
        </div>
      )}
      
      <div className="container py-5">
        <div className="row g-4">
          {/* Mentor Info */}
          <div className="col-lg-4">
            <div className="profile-card">
              <div className="mentor-header">
                <img src={mentor.photo} alt={mentor.name} className="profile-photo" />
                <div className="online-indicator"></div>
              </div>
              <h2>{mentor.name}</h2>
              <p className="title">{mentor.title}</p>
              <p className="experience">
                <i className="fas fa-briefcase me-2"></i>
                {mentor.experience} years experience
              </p>
              <div className="expertise-tags mb-4">
                {mentor.expertise.map((skill, index) => (
                  <span key={index} className="badge bg-light text-dark me-2 mb-2">
                    {skill}
                  </span>
                ))}
              </div>
              <p className="bio">{mentor.bio}</p>
              <div className="mentor-stats">
                <div className="stat">
                  <i className="fas fa-star"></i>
                  <span>{(Math.random() * (5 - 4.5) + 4.5).toFixed(1)} Rating</span>
                </div>
                <div className="stat">
                  <i className="fas fa-users"></i>
                  <span>{Math.floor(Math.random() * (100 - 50) + 50)} Sessions</span>
                </div>
              </div>
            </div>
          </div>

          {/* Booking Calendar */}
          <div className="col-lg-8">
            <div className="booking-section">
              <h3>
                <i className="fas fa-calendar-check me-2"></i>
                Book a Session
              </h3>
              <div className="calendar-container">
                <Calendar
                  onChange={handleDateSelect}
                  value={selectedDate}
                  minDate={new Date()}
                  tileDisabled={({ date }) => isPastDate(date)}
                  className="custom-calendar"
                />
              </div>
              
              {selectedDate && (
                <div className="time-slots mt-4">
                  <h4>
                    <i className="far fa-clock me-2"></i>
                    Available Slots for {selectedDate.toDateString()}
                  </h4>
                  <div className="slots-grid">
                    {getAvailableSlots(selectedDate).map((slot) => {
                      const isBooked = isSlotBooked(selectedDate, slot);
                      return (
                        <button
                          key={slot}
                          className={`slot-btn ${selectedSlot === slot ? 'selected' : ''} ${isBooked ? 'booked' : ''}`}
                          onClick={() => handleSlotSelect(slot)}
                          disabled={loading || bookingSuccess || isBooked}
                          title={isBooked ? "You've already booked this slot" : ""}
                        >
                          {formatTimeSlot(slot)}
                          {isBooked && <div className="booked-indicator">Booked</div>}
                        </button>
                      );
                    })}
                  </div>

                  {selectedSlot && (
                    <div className="booking-confirmation mt-4">
                      <div className="selected-datetime">
                        <i className="fas fa-check-circle me-2"></i>
                        Selected: {selectedDate.toDateString()} at {formatTimeSlot(selectedSlot)}
                      </div>
                      <button
                        className="btn btn-primary w-100"
                        onClick={handleBookSession}
                        disabled={loading || bookingSuccess}
                      >
                        {loading ? (
                          <span>
                            <i className="fas fa-spinner fa-spin me-2"></i>
                            Booking Session...
                          </span>
                        ) : bookingSuccess ? (
                          <span>
                            <i className="fas fa-check me-2"></i>
                            Session Booked!
                          </span>
                        ) : (
                          <span>
                            <i className="fas fa-calendar-check me-2"></i>
                            Book Session
                          </span>
                        )}
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Chat Section */}
        {showChat && currentSession && (
          <div className="chat-section mt-4">
            <h3>
              <i className="fas fa-comments me-2"></i>
              Chat with {mentor.name}
            </h3>
            <div className="session-info mb-3">
              <p className="text-muted">
                <i className="far fa-calendar-alt me-2"></i>
                Booked session: {new Date(currentSession.date).toLocaleDateString()} at {currentSession.time}
              </p>
            </div>
            <div className="chat-container">
              <MainContainer>
                <ChatContainer>
                  <MessageList 
                    typingIndicator={isTyping ? <TypingIndicator content={`${mentor.name} is typing`} /> : null}
                  >
                    {messages.map((message, index) => (
                      <Message key={index} model={message}>
                        <Message.Header sender={message.sender} sentTime={message.sentTime} />
                      </Message>
                    ))}
                  </MessageList>
                  <MessageInput
                    placeholder="Type your message here..."
                    onSend={handleSendMessage}
                    attachButton={false}
                  />
                </ChatContainer>
              </MainContainer>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MentorProfile;