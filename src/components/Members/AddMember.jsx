import React, { useState } from 'react';
import './AddMember.css';

const AddMember = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    status: '',
    notes: ''
  });

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value
    }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    // You can perform form submission logic here, e.g., send data to the server
    console.log({ formData });
    await onSubmit(formData);
    onCancel();
  };

  return (
    <div className="addMember_root">
      <p className="addMember__heading">Add Member</p>
      <br />
      <div>
        <form className="addMember__form" onSubmit={handleSubmit}>
          <div>
            <div className="addMember__fieldName">Name</div>
            <input
              className="addMember__field"
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <div className="addMember__fieldName">Company</div>
            <input
              className="addMember__field"
              type="text"
              id="company"
              name="company"
              value={formData.company}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <div className="addMember__fieldName">Status</div>
            <input
              className="addMember__field"
              type="text"
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <div className="addMember__fieldName">Notes</div>
            <input
              className="addMember__field"
              type="text"
              id="notes"
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              required
            />
          </div>
          <div className='addMember__btnField'>
            <button className="addMember_cancelBtn" type="reset" onClick={onCancel}>
              Cancel
            </button>
            <button className="addMember_saveBtn" type="submit">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddMember;
