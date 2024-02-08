// AddEventModal.js
import React, { useState } from 'react';
import Modal from 'react-modal';
import { ScheduleCreateForm } from '../ui-components';
import * as commands from "../support_local_files/support_func.js";


const AddEventModal = ({ isOpen, onRequestClose, onAddEvent }) => {
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            contentLabel="Add Event Modal"
            ariaHideApp={false} // This disables the warning about the modal not being accessible to screen readers
        >
            <div className="p-4 bg-gray-200">
                <h2 className="text-2xl font-bold mb-4">Add Event</h2>
                <ScheduleCreateForm onSubmit={(fields) => {
                    // Example function to trim all string inputs
                    const updatedFields = {}
                    Object.keys(fields).forEach(key => {

                        updatedFields[key] = fields[key]


                    })
                    updatedFields['userinfoID'] = (commands.cognito_Id)
                    console.log(`testing`, { updatedFields })
                    return updatedFields
                }} onError={(error) => {
                    console.log(`testing`, error)
                }} />
            </div>
        </Modal>
    );
};

export default AddEventModal;
