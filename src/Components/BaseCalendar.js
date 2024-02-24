import React, { useState, useEffect } from "react";

import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./CalendarStyle.css";
import { list_schedule_item } from "../support_local_files/support_func";
// import { EventDesc, ScheduleCreateForm } from '../ui-components';
import AddEventModal from "./AddEventModal";
import addIcon from "../icons/add.svg";
// import { InfoBox } from '../ui-components';
// import ConfirmationModal from './ConfirmationModal'; // Import the new component
import Sidebar from "./Sidebar";
import EventDescModal from "./EventDescModal";
import { RRule } from "rrule";
import { subscribedScedule, create_schedule } from "../support_local_files/support_func";
import MyComponent from "./Chatbot";
// import { createSchedule } from "../graphql/mutations";

const localizer = momentLocalizer(moment);

const MyCalendar = () => {
  const [myEvents, setAllEvents] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEventModalOpen, setIsEventModalOpen] = useState(false);
  // const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const [selectedEvent, setSelectedEvent] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        let todos;
        const localData = localStorage.getItem("todos");
        if (localData) {
          console.log("localData");
          const parsedData = JSON.parse(localData);
          // const allEventsData = processEvents(parsedData);
          setAllEvents(parsedData);
          // console.log("parsedData", parsedData);
        } else {
          todos = await fetchData_local();
          const allEventsData = processEvents(todos.data.listSchedules.items);
          setAllEvents(allEventsData);
          localStorage.setItem(
            "todos",
            JSON.stringify(todos.data.listSchedules.items)
          );
          console.log("todos", todos.data.listSchedules.items);
        }
        await subscribeToChanges(); // Call function toLocaleString('') subscribe toLocaleString('') database changes
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData(); // Call fetchData when the component mounts
    async function fetchData_local() {
      try {
        const todos = await list_schedule_item();
        // Inside fetchData_local
        // localStorage.setItem(
        //   "todos",
        //   JSON.stringify(todos.data.listSchedules.items)
        // );

        const allEvents = processEvents(todos.data.listSchedules.items);
        // console.log("HERE in fetch", todos.data.listSchedules.items);
        setAllEvents(allEvents);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    async function subscribeToChanges() {
      try {
        //
        const [createSub, updateSub, deleteSub] = await subscribedScedule();
        if (createSub || updateSub || deleteSub) {
          const todos = await list_schedule_item();
          const allEvents = processEvents(todos.data.listSchedules.items);
          updateLocalStorage(allEvents);
        }
      } catch (error) {
        console.error("Error subscribing toLocaleString('') changes:", error);
      }
    }
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

    async function updateLocalStorage(data) {
      try {
        localStorage.setItem("todos", JSON.stringify(data));
        setAllEvents(data);
      } catch (error) {
        console.error("Error updating local storage:", error);
      }
    }
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
    location: event.LOCATION,
    description: event.DESCRIPTION,
    createdAt: new Date(event.createdAt),
    updatedAt: new Date(event.updatedAt),
    owner: event.owner,
    userinfoID: event.userinfoID,
    id: event.id,
  }));

  const handleAddEvent = (newEvent) => {
    setAllEvents([...myEvents, newEvent]);
    create_schedule(newEvent);
    console.log("newEvent", newEvent);
    setIsAddModalOpen(false); // Close the form after adding event
  };

  const handleDoubleClickEvent = (event) => {
    setSelectedEvent(event);
    setIsEventModalOpen(true); // Open the modal
  };
  const originalSelectedEvent = myEvents.find(
    (item) => item.id === selectedEvent?.id
  );
  console.log("originalSelectedEvent", originalSelectedEvent);

  return (
    <div className="flex flex-row bg-black">
      <div className="flex-1 relative">
        <div className="h-screen bg-gray-200 flex items-center justify-center">
          <EventDescModal
            event={originalSelectedEvent}
            isOpen={isEventModalOpen}
            onClose={() => setIsEventModalOpen(false)}
          />
          <Calendar
            localizer={localizer}
            events={transformedEvents}
            startAccessor="start"
            endAccessor="end"
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
        style={{ background: "#171717", fontFamily: "cursive", color: "white" }}
      >
        <div className="flex">
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="bg-gray-800 p-2 rounded-full flex items-center justify-center hover:bg-gray-200  transition duration-300 mt-4 mb-2 mr-3" // Added mr-2 for right margin
            style={{ fontFamily: "cursive", color: "white" }}
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
            style={{ fontFamily: "cursive", color: "white" }}
          >
            <span className="text-white font-bold px-2  hover:text-black">
              Add Tasks
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
            fontFamily: "proxima-nova",
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
            fontFamily: "cursive",
            color: "white",
            height: "50%",
            width: "100%",
          }}
        >
          <div className="text-white text-sm font-bold py-2">CHATBOT</div>

          <MyComponent />
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
