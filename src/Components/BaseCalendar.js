import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./CalendarStyle.css";
import {
  cognito_Id,
  list_schedule_item,
  access_Token,
  backend_Server_ip,
} from "./support_func";
import AddEventModal from "./AddEventModal";
import addIcon from "../icons/add.svg";
import Sidebar from "./Sidebar";
import EventDescModal from "./EventDescModal";
import { RRule } from "rrule";
// import ConfirmAddModal from "./ConfirmAddEvent";
import {
  create_user,
  create_schedule,
  deleteSchedule,
  create_task,
  update_task,
  delete_task,
} from "./support_func";
import Chatbot from "./Chatbot";
import axios from "axios";
import ChatbotConfirmModel from "./ChatbotConfirmModel";

const localizer = momentLocalizer(moment);
const create_temp = create_user();
const MyCalendar = () => {
  // currentAuthenticatedUser();
  // send_data_backend();
  const [forcedRefresh, setforcedRefresh] = useState(false);
  const [myEvents, setAllEvents] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEventModalOpen, setIsEventModalOpen] = useState(false);
  const [chatbotpendingEvent, setchatbotpendingEvent] = useState([]);
  const [chatbotpendingTask, setchatbotpendingTask] = useState(null);

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
        console.log(todos);
        const allEvents = processEvents(todos);
        setAllEvents(allEvents);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
    // eslint-disable-next-line
  }, [forcedRefresh]);

  let counter = 0;
  const update_counter = () => {
    counter += 1;
    return counter;
  };

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
      id: String(update_counter()),
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
    subject_id: event.subjectsID,
    ScheduleGradeInfo: event.ScheduleGradeInfo || null,
    personalized_task: event.personalized_task || null,
    color: event.personalized_task ? "#107896" : event.color || null,
  }));

  const handleAddEvent = async (newEvent) => {
    const result = await create_schedule(newEvent);
    console.log(result);
    setAllEvents([...myEvents, result.data.createSchedule]);
    console.log("newEvent", newEvent);
    setIsAddModalOpen(false); // Close the form after adding event
  };

  const handleDelEvent = async (newEvent) => {
    // const result = await create_schedule(newEvent);
    console.log("In del", newEvent);
    await deleteSchedule(newEvent.id);
    setAllEvents(myEvents.filter((event) => event.id !== newEvent.id));
  };

  function handleGPTevent(
    addEvents,
    deletedEvents,
    tasktype,
    personalized_tasks
  ) {
    // Highlight the new event by adding a special property

    addEvents.forEach((newEvent) => {
      if (newEvent.hasOwnProperty("id")) {
        delete newEvent.id;
      }
      newEvent.color = "green";
    });
    myEvents.forEach((myEvent) => {
      deletedEvents.forEach((deletedEvent) => {
        if (myEvent.id === deletedEvent.id) {
          myEvent.color = "red";
          deletedEvent.color = "red";
        }
      });
    });
    // if (personalized_tasks) {
    //   if (personalized_tasks.length !== 0) {
    //     setHiddenEvents(
    //       myEvents.filter((event) => event.personalized_task === true)
    //     );
    //     setAllEvents(
    //       myEvents.filter((event) => event.personalized_task !== true)
    //     );
    //   }
    //   personalized_tasks.forEach((newEvent) => {
    //     if (newEvent.hasOwnProperty("id")) {
    //       delete newEvent.id;
    //     }
    //     newEvent.color = "green";
    //   });

    //   setAllEvents([...myEvents, ...addEvents, ...personalized_tasks]);
    //   setchatbotpendingEvent([
    //     ...deletedEvents,
    //     ...addEvents,
    //     ...personalized_tasks,
    //   ]);
    // } else {
    setAllEvents([...myEvents, ...addEvents]);
    setchatbotpendingEvent([...deletedEvents, ...addEvents]);
  }

  function handleGPTtasks(Task) {
    // Highlight the new event by adding a special property

    setchatbotpendingEvent([Task]);
    setchatbotpendingTask(Task);
  }

  async function handleConfirmGptEvent() {
    console.log("in handle confirm");
    for (const element of chatbotpendingEvent) {
      console.log("🚀 ~ chatbotpendingEvent.forEach ~ element:", element);
      if (element.color === "green") {
        const index = myEvents.indexOf(element);
        if (index > -1) {
          myEvents.splice(index, 1);
        }
        console.log("Trying to Add via Chatbot");
        delete element.color;
        element.DTSTART = new Date(element.DTSTART);
        element.DTEND = new Date(element.DTEND);
        await handleAddEvent(element);
      } else if (element.color === "red") {
        console.log("Trying to Delete via Chatbot");
        delete element.color;
        element.DTSTART = new Date(element.DTSTART);
        element.DTEND = new Date(element.DTEND);
        await handleDelEvent(element);
      } else if (element.color === "orange") {
        console.log("Trying to Add Task");
        delete element.color;
        element.DUE = new Date(element.DUE);
        await create_task(element);
        setchatbotpendingTask(null);
      } else if (element.color === "yellow") {
        console.log("Trying to Update Task");
        delete element.color;
        element.DUE = new Date(element.DUE);
        await update_task(element);
        setchatbotpendingTask(null);
      } else if (element.color === "purple") {
        console.log("Trying to Delete Task");
        delete element.color;
        await delete_task(element.id);
        setchatbotpendingTask(null);
      }
    }

    setforcedRefresh(!forcedRefresh);
    // hiddenEvents.forEach((event) => deleteSchedule(event.id));
    // setHiddenEvents([]);
    setchatbotpendingEvent([]);
  }

  function handleCancelGptEvent() {
    chatbotpendingEvent.forEach((element) => {
      const index = myEvents.indexOf(element);
      if (index > -1) {
        myEvents.splice(index, 1);
      }
    });
    // setAllEvents([...myEvents, ...hiddenEvents]);
    // setHiddenEvents([]);
    setchatbotpendingTask(null);
    setchatbotpendingEvent([]);
  }

  const handleEventClick = (clickedEvent, e) => {
    // Check if the clicked event is the pending event
    const rect = e.target.getBoundingClientRect();
    console.log(rect);
    setModalPosition({ top: rect.top, left: rect.left });
    console.log("rect", modalPosition);
  };

  const handleDoubleClickEvent = (event) => {
    setSelectedEvent(event);
    setIsEventModalOpen(true); // Open the modal
  };

  const originalSelectedEvent = myEvents.find(
    (item) => item.id === selectedEvent?.id
  );

  const [subscribe_visible, setSubscribeVisible] = useState(false);
  const [subscribe_url, setSubscribe_url] = useState("");
  const [subscribe_name, setSubscribe_name] = useState("");
  const [urlError, setUrlError] = useState(false);

  const validateUrl = (url) => {
    // Regular expression to validate URL
    const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;
    return urlRegex.test(url);
  };

  const handleButtonClick = () => {
    setSubscribeVisible(true);
  };

  const handleInputChange1 = (event) => {
    setSubscribe_url(event.target.value);
    setUrlError(false);
  };

  const handleInputChange2 = (event) => {
    setSubscribe_name(event.target.value);
  };

  const handleSubscribeSubmit = () => {
    // Send data via Axios

    const isValidUrl = validateUrl(subscribe_url);
    console.log("🚀 ~ handleSubscribeSubmit ~ subscribe_url:", subscribe_name);

    if (!isValidUrl) {
      setUrlError(true);
      return;
    }
    console.log("In here");
    axios
      .post(`${backend_Server_ip}/Subscribe`, {
        calendar_url: subscribe_url,
        calendar_name: subscribe_name,
        userId: cognito_Id,
        Token: access_Token,
      })
      .then((response) => {
        // Handle success
        console.log("Data sent successfully:", response.data);
      })
      .catch((error) => {
        // Handle error
        console.error("Error sending data:", error);
      });

    setSubscribe_url("");
    setSubscribe_name("");

    setSubscribeVisible(false);
    setforcedRefresh();
  };

  const handleSubscribeClose = () => {
    setSubscribeVisible(false);
    // Optionally reset input values when closing
    setSubscribe_url("");
    setSubscribe_name("");
  };

  const eventStyleGetter = (event, start, end, isSelected) => {
    let color = event.color;
    if (color) {
      let style = {
        backgroundColor: color,
        color: "#fff", // Text color
        borderRadius: "0.5rem", // Border radius for rounded corners
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)", // Subtle box shadow
        overflow: "hidden", // Ensure content doesn't overflow
        textOverflow: "ellipsis", // Add ellipsis for overflow text
        width: "10rem", // Width of the event
        right: "0%", // Positioning
        border: "none", // Remove border
      };

      return {
        style: style,
      };
    }
  };

  create_temp(transformedEvents, () => {
    setforcedRefresh();
  });
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

          <Calendar
            localizer={localizer}
            events={transformedEvents}
            eventPropGetter={eventStyleGetter}
            startAccessor="start"
            endAccessor="end"
            onSelectEvent={handleEventClick}
            onDoubleClickEvent={handleDoubleClickEvent}
            defaultView="week"
            views={["month", "week", "day", "agenda"]}
            className="w-3/4 left-0 top-0 absolute bg-white p-4  shadow-lg"
          />
        </div>
      </div>

      <div
        className="fixed top-0 right-0 h-full w-1/4 flex flex-col items-center justify-start overflow-y-auto"
        style={{
          background: "#171717",

          color: "white",
          zIndex: 10,
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
          <div>
            {!subscribe_visible && (
              <button
                onClick={handleButtonClick}
                className="bg-gray-800 p-2 rounded-full flex items-center justify-center hover:bg-gray-200 transition duration-300 mt-4 mb-2"
                style={{ color: "white" }}
              >
                <span className="text-white font-bold px-2 hover:text-black">
                  Subscribe
                </span>
                <img
                  src={addIcon}
                  alt="Add Tasks"
                  className="w-6 h-6 fill-current text-white"
                />
              </button>
            )}

            {subscribe_visible && (
              <div className="flex items-center flex-wrap">
                <input
                  type="url"
                  value={subscribe_url}
                  onChange={handleInputChange1}
                  placeholder="Enter URL"
                  className={`bg-gray-200 p-2 rounded-md mb-2 mr-2 ${
                    urlError ? "border-red-500" : ""
                  }`}
                />
                <input
                  type="text"
                  value={subscribe_name}
                  onChange={handleInputChange2}
                  placeholder="Enter Calendar Name"
                  className="bg-gray-200 p-2 rounded-md mb-2"
                />

                <button
                  onClick={handleSubscribeSubmit}
                  className="bg-gray-800 p-2 rounded-full flex items-center justify-center hover:bg-gray-200 transition duration-300"
                  style={{ color: "white" }}
                >
                  <span className="text-white font-bold px-2 hover:text-black">
                    Submit
                  </span>
                </button>
                <button
                  onClick={handleSubscribeClose}
                  className="bg-red-600 p-2 rounded-full flex items-center justify-center hover:bg-red-400 transition duration-300"
                  style={{ color: "white" }}
                >
                  <span className="text-white font-bold px-2 hover:text-black">
                    Close
                  </span>
                </button>
              </div>
            )}
          </div>
        </div>
        <div
          className="flex flex-col items-center justify-start overflow-y-auto"
          style={{
            background: "#171717",
            // fontFamily: "proxima-nova",
            color: "white",
            height: "50vh",
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
            height: "45vh",
            width: "100%",
          }}
        >
          <div className="text-white text-sm font-bold py-2">CHATBOT</div>

          {!chatbotpendingEvent.length && (
            <Chatbot
              onAddgptevent={handleGPTevent}
              onAddgptTask={handleGPTtasks}
            />
          )}
          {chatbotpendingEvent.length !== 0 && (
            <ChatbotConfirmModel
              taskitem={chatbotpendingTask}
              onConfirm={handleConfirmGptEvent}
              onCancel={handleCancelGptEvent}
            />
          )}
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
