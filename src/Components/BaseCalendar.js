import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./CalendarStyle.css";
import { list_schedule_item } from "./support_func";
import AddEventModal from "./AddEventModal";
import addIcon from "../icons/add.svg";
import Sidebar from "./Sidebar";
import EventDescModal from "./EventDescModal";
import { RRule } from "rrule";
import ConfirmAddModal from "./ConfirmAddEvent";
import { create_user, create_schedule } from "./support_func";
import Chatbot from "./Chatbot";

const localizer = momentLocalizer(moment);
const create_temp = create_user();
const MyCalendar = () => {
  const [myEvents, setAllEvents] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEventModalOpen, setIsEventModalOpen] = useState(false);
  const [pendingEvent, setPendingEvent] = useState(null);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);

  // const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const [selectedEvent, setSelectedEvent] = useState(null);

  // const [selectedSlot, setSelectedSlot] = useState(null);
  const [modalPosition, setModalPosition] = useState(null);

  useEffect(() => {
    const processEvents = (fetchedEvents) => {
      const processedEvents = [];

      fetchedEvents.forEach((event) => {
        if (event.RRULE) {
          const occurrences = generateOccurrences(event);
          processedEvents.push(...occurrences);
        } else {
          processedEvents.push(event);
        }
      });

      return processedEvents;
    };
    async function fetchData() {
      try {
        const todos = await list_schedule_item();
        const allEvents = processEvents(todos);
        setAllEvents(allEvents);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, []);

  const generateOccurrences = (event) => {
    const { BYDAYS, FREQ, INTERVALS, UNTIL, WKST } = event.RRULE;

    // Convert BYDAYS string toLocaleString('') an array of days
    const byDaysArray = BYDAYS ? BYDAYS.split(",") : [];

    // Parse UNTIL date
    const untilDate = new Date(UNTIL);

    // Create an RRule object
    const rule = new RRule({
      freq: RRule[FREQ],
      interval: INTERVALS,
      byweekday: byDaysArray.map((day) => RRule[day]),
      until: untilDate,
      wkst: RRule[WKST],
      dtstart: new Date(event.DTSTART),
    });

    // Generate occurrences based on the rule
    const occurrences = rule.all();

    // console.log("occurrences", occurrences);
    return occurrences.map((occurrence) => ({
      ...event,
      DTSTART: occurrence,
      DTEND: new Date(
        new Date(occurrence).getTime() +
          (new Date(event.DTEND).getTime() - new Date(event.DTSTART).getTime())
      ),
      // Adjust other properties as needed
    }));
  };

  const transformedEvents = myEvents.map((event) => ({
    title: event.SUMMARY,
    start: new Date(event.DTSTART),
    end: new Date(event.DTEND),
    location: event.LOCATION ? event.LOCATION : "",
    description: event.DESCRIPTION ? event.DESCRIPTION : "",
    createdAt: new Date(event.createdAt),
    updatedAt: new Date(event.updatedAt),
    owner: event.owner,
    userinfoID: event.userinfoID,
    id: event.id,
    isNew: event.isNew ? event.isNew : false,
  }));

  const handleAddEvent = async (newEvent) => {
    const result = await create_schedule(newEvent);
    console.log(result);
    setAllEvents([...myEvents, result.data.createSchedule]);
    console.log("newEvent", newEvent);
    setIsAddModalOpen(false); // Close the form after adding event
  };

  const handleDelEvent = (newEvent) => {
    // const result = await create_schedule(newEvent);
    console.log("In del");
    setAllEvents(myEvents.filter((event) => event !== newEvent));
  };

  function handleGPTevent(newEvent) {
    // Highlight the new event by adding a special property

    const highlightedNewEvent = { ...newEvent, isNew: true };
    console.log("GPT EVENT", highlightedNewEvent);
    // Temporarily add the new event to the list of events
    // setAllEvents([...myEvents, highlightedNewEvent]);
    // Store the new event as the pending event
    setPendingEvent(highlightedNewEvent);
    console.log("PENDING", pendingEvent);
    setSelectedEvent(pendingEvent);
    // setModalPosition({ top: rect.top, left: rect.left });
    setIsConfirmationModalOpen(true);
  }

  const handleEventClick = (clickedEvent, e) => {
    // Check if the clicked event is the pending event
    const rect = e.target.getBoundingClientRect();
    console.log(rect);
    setModalPosition({ top: rect.top, left: rect.left });
    console.log("rect", modalPosition);
    // if (clickedEvent.isNew) {
    //   // If yes, open a confirmation pop-up
    //   console.log("clickedEvent", clickedEvent);
    //   setIsConfirmationModalOpen(true);
    // }
  };

  const handleConfirmation = async (confirmed) => {
    // Close the confirmation pop-up
    setIsConfirmationModalOpen(false);
    if (confirmed) {
      // If the user confirms, remove the 'isNew' property from the pending event
      const confirmedEvent = { ...pendingEvent };
      delete confirmedEvent.isNew;
      console.log("confirmedEvent", confirmedEvent);
      // Add the confirmed event to the list of events
      setAllEvents(myEvents.filter((event) => event !== confirmedEvent));
      const result = await create_schedule(confirmedEvent);
      setAllEvents([...myEvents, result.data.createSchedule]);
    } else {
      // If the user denies, remove the pending event from the list of events
      setAllEvents(myEvents.filter((event) => event !== pendingEvent));
    }
  };

  const handleDoubleClickEvent = (event) => {
    setSelectedEvent(event);
    setIsEventModalOpen(true); // Open the modal
  };

  const originalSelectedEvent = myEvents.find(
    (item) => item.id === selectedEvent?.id
  );

  create_temp(transformedEvents);
  return (
    <div className="flex flex-row bg-black">
      <div className="flex-1 relative">
        <div className="h-screen bg-gray-200 flex items-center justify-center">
          {isEventModalOpen && (
            <EventDescModal
              event={originalSelectedEvent}
              isOpen={isEventModalOpen}
              onClose={() => setIsEventModalOpen(false)}
              position={modalPosition}
              onDel={handleDelEvent}
            />
          )}
          {
            <ConfirmAddModal
              event={pendingEvent}
              isOpen={isConfirmationModalOpen}
              onConfirm={handleConfirmation}
              onCancel={() => setIsConfirmationModalOpen(false)}
              position={modalPosition}
            />
          }
          <Calendar
            localizer={localizer}
            events={transformedEvents}
            startAccessor="start"
            endAccessor="end"
            onSelectEvent={handleEventClick}
            onDoubleClickEvent={handleDoubleClickEvent}
            defaultView="week"
            views={["month", "week", "day", "agenda"]}
            className="w-3/4 left-0 top-0 absolute bg-white p-4  shadow-lg"
          />
          {/* <Sidebar /> */}
        </div>
      </div>

      <div
        className="fixed top-0 right-0 h-full w-1/4 flex flex-col items-center justify-start overflow-y-auto"
        style={{
          background: "#171717",
          // fontFamily: "cursive",
          color: "white",
        }}
      >
        <div className="flex">
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="bg-gray-800 p-2 rounded-full flex items-center justify-center hover:bg-gray-200  transition duration-300 mt-4 mb-2 mr-3" // Added mr-2 for right margin
            style={{ color: "white" }}
          >
            <span className="text-white font-bold px-2  hover:text-black">
              Add Event
            </span>
            <img
              src={addIcon}
              alt="Add Event"
              className="w-6 h-6 fill-current text-white"
            />
          </button>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="bg-gray-800 p-2 rounded-full flex items-center justify-center hover:bg-gray-200  transition duration-300 mt-4 mb-2"
            style={{ color: "white" }}
          >
            <span className="text-white font-bold px-2  hover:text-black">
              Subscribe
            </span>
            <img
              src={addIcon}
              alt="Add Tasks"
              className="w-6 h-6 fill-current text-white"
            />
          </button>
        </div>

        <div
          className="flex flex-col items-center justify-start overflow-y-auto"
          style={{
            background: "#171717",
            // fontFamily: "proxima-nova",
            color: "white",
            height: "55%",
            width: "100%",
          }}
        >
          <h1 className="text-white text-xl font-bold mb-2 py-5 h-1">Tasks</h1>
          <Sidebar />
        </div>

        <div
          className="flex flex-col items-center justify-start overflow-y-auto"
          style={{
            background: "#171717",
            // fontFamily: "cursive",
            color: "white",
            height: "50%",
            width: "100%",
          }}
        >
          <div className="text-white text-sm font-bold py-2">CHATBOT</div>

          <Chatbot onAddgptevent={handleGPTevent} />
        </div>
      </div>

      <AddEventModal
        isOpen={isAddModalOpen}
        onRequestClose={() => setIsAddModalOpen(false)}
        onAddEvent={handleAddEvent}
      />
    </div>
  );
};

export default MyCalendar;
