import React, { useEffect, useState } from 'react';
import './Members.css';
import Button from '../common/Button/Button';
import { useDispatch, useSelector } from 'react-redux';

import { addMembers, dumpMembers, deleteMember } from './membersSlice';
import { supabaseClient } from '../../services/client';
import Dropdown from '../common/Dropdown/Dropdown';
import Modal from '../common/Modal/Modal';
import AddMember from './AddMember';
import { SNACKBAR_TYPE } from '../../utils/constants';

const Members = ({ handleSnackbar, loggedInUser = {} }) => {
  const members = useSelector(state => state.members);
  const dispatch = useDispatch();

  const [showModal, setShowModal] = useState(false);
  const [statusFilterApplied, setStatusFilterApplied] = useState(false);
  const [selectedCompanies, setSelectedCompanies] = useState([]);

  useEffect(() => {
    listAllMembers();
  }, []);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleAddMember = async member => {
    const { data, error } = await supabaseClient
      .from('members')
      .insert({ ...member, id: Math.floor(Math.random() * 400), user_id: loggedInUser.user.id })
      .select('*')
      .single();
    if (!error) {
      dispatch(addMembers(data));
      handleSnackbar({
        type: SNACKBAR_TYPE.success,
        message: 'Member added successfully!'
      });
    }
  };

  const listAllMembers = async () => {
    const { data, error } = await supabaseClient.from('members').select('*');
    if (!error) {
      dispatch(dumpMembers(data));
    }
  };

  const handleDeleteMember = async id => {
    const { error } = await supabaseClient.from('members').delete().eq('id', id);
    if (!error) {
      dispatch(deleteMember(id));
    }
  };

  const handleStatusSort = asc => {
    setStatusFilterApplied(v => !v);
    let temp = [...members];
    temp.sort((a, b) => {
      if (asc) {
        return a.status > b.status ? 1 : -1;
      } else {
        return a.status > b.status ? -1 : 1;
      }
    });
    dispatch(dumpMembers(temp));
  };

  function formatDateToDDMMYYYY(isoDate) {
    const date = new Date(isoDate);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based, so we add 1
    const year = date.getFullYear().toString();

    return `${day}/${month}/${year}`;
  }

  return (
    <section className="members__section">
      <div className="members__titleSection">
        <span className="members__title">Team Members</span>&nbsp;
        <Button onClick={openModal} className="members__addBtn" color="blue">
          Add Members +
        </Button>
        {showModal && (
          <Modal>
            <AddMember onSubmit={handleAddMember} onCancel={closeModal} />
          </Modal>
        )}
      </div>
      <hr />

      <div className="members__tableSection">
        <div>
          <Dropdown multiSelect options={members.map(i => i.company)} onChange={setSelectedCompanies} />

          {statusFilterApplied ? (
            <span className="members__sortCta" onClick={() => handleStatusSort()}>
              Status &#x25BC;
            </span>
          ) : (
            <span className="members__sortCta" onClick={() => handleStatusSort(1)}>
              Status &#x25B2;
            </span>
          )}
        </div>
        <div>
          <table className="members__table">
            <thead>
              <tr>
                <th>
                  <input type="checkbox" />
                </th>
                <th>Name</th>
                <th>Company</th>
                <th>Status</th>
                <th>Last Updated</th>
                <th>Notes</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {members
                .filter(m => (selectedCompanies.length ? selectedCompanies.includes(m.company) : true))
                .map(({ id, name = '', company = '', status = '', notes = '', last_update_at = '' }) => (
                  <tr key={id}>
                    <td>
                      <input type="checkbox" checked={selectedCompanies.includes(company)} />
                    </td>
                    <td>{name}</td>
                    <td>{company}</td>
                    <td>{status}</td>
                    <td>{formatDateToDDMMYYYY(last_update_at)}</td>
                    <td>{notes}</td>
                    <td onClick={() => handleDeleteMember(id)} style={{ cursor: 'pointer' }}>
                      &#128465;
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default Members;
