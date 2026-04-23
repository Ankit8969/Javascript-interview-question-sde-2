import { useState } from "react";
import "./styles.css";

const CalendarApp = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [eventTitle, setEventTitle] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [validationError, setValidationError] = useState("");

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();
  const today = new Date();

  // ✅ FIX: stable key
  // It will convert to this => "2026-04-23"
  const formatDateKey = (date) => new Date(date).toISOString().split("T")[0];

  const goToPreviousMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth - 1, 1));
  };

  const goToNextMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth + 1, 1));
  };

  const openAddEventModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setValidationError("");
  };

  const saveEvent = () => {
    if (!eventTitle || !eventDate) {
      setValidationError("Please fill all fields");
      return;
    }

    const key = formatDateKey(eventDate);

    setEvents((prev) => ({
      ...prev,
      [key]: [
        ...(prev[key] || []),
        {
          id: Date.now(),
          title: eventTitle,
        },
      ],
    }));

    setEventTitle("");
    setEventDate("");
    closeModal();
  };

  const deleteEvent = (eventId, date) => {
    const key = formatDateKey(date);

    setEvents((prev) => ({
      ...prev,
      [key]: prev[key].filter((e) => e.id !== eventId),
    }));
  };

  const isToday = (day) => {
    return formatDateKey(day) === formatDateKey(today);
  };

  const getEventsForDay = (day) => {
    const key = formatDateKey(day);
    const dayEvents = events[key];

    if (!dayEvents) return null;

    return dayEvents.map((event) => (
      <div key={event.id} className="event-item">
        {event.title}
        <span onClick={() => deleteEvent(event.id, key)} className="delete-btn">
          X
        </span>
      </div>
    ));
  };

  const renderCalendarDays = () => {
    const days = [];
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1;

    const firstWeekDayOfMonth = new Date(year, month - 1, 1).getDay();

    for (let i = 0; i < firstWeekDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="calendar-day"></div>);
    }

    const daysInMonth = new Date(year, month, 0).getDate();

    for (let i = 1; i <= daysInMonth; i++) {
      const currentDay = new Date(year, month - 1, i);

      let blockClass = "calendar-day day-number";
      if (isToday(currentDay)) {
        blockClass += " today";
      }

      let element = (
        <div key={i} className={blockClass}>
          {i}
          {getEventsForDay(currentDay)}
        </div>
      );

      days.push(element);
    }

    return days;
  };

  return (
    <div className="calendar-app" data-testid="calendar-container">
      <div className="calendar-header">
        <button
          data-testid="prev-month-btn"
          className="nav-btn"
          onClick={goToPreviousMonth}
        >
          &#8249;
        </button>
        <span data-testid="month-year-display">
          {monthNames[currentMonth]} {currentYear}
        </span>
        <button
          data-testid="next-month-btn"
          className="nav-btn"
          onClick={goToNextMonth}
        >
          &#8250;
        </button>
      </div>

      <button
        data-testid="add-event-btn"
        className="add-event-btn"
        onClick={openAddEventModal}
      >
        + Add Event
      </button>

      <div className="calendar-grid">
        <div className="weekdays">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
            <div key={d} className="weekday">
              {d}
            </div>
          ))}
        </div>

        <div className="days-grid">{renderCalendarDays()}</div>
      </div>

      {showModal && (
        <div className="modal-overlay" data-testid="event-modal">
          <div className="modal modal-body form-group">
            {validationError && (
              <div className="error-message" data-testid="validation-error">
                {validationError}
              </div>
            )}
            <form className="form-group">
              <div className="modal-header">Add Event:</div>
              <label>Event title:</label>
              <input
                data-testid="event-title-input"
                value={eventTitle}
                onChange={(e) => setEventTitle(e.target.value)}
                placeholder="Event title"
              />
              <label>Event Date:</label>
              <input
                type="date"
                data-testid="event-date-input"
                value={eventDate}
                onChange={(e) => setEventDate(e.target.value)}
              />
            </form>
            <div className="modal-footer">
              <button
                className="save-btn"
                data-testid="save-event-btn"
                onClick={saveEvent}
              >
                Save Event
              </button>
              <button
                className="cancel-btn"
                data-testid="close-modal-btn"
                onClick={closeModal}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CalendarApp;
