"use client";
import { useEffect, useState, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { DataTable } from "mantine-datatable";
import IconPlus from "@/components/icon/icon-plus";
import IconPencil from "@/components/icon/icon-pencil";
import IconTrash from "@/components/icon/icon-trash";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/flatpickr.min.css";

const MySwal = withReactContent(Swal);

const ComponentsDatatablesNotification = () => {
  const [modal1, setModal1] = useState(false); // Modal state for both adding and editing
  const [editMode, setEditMode] = useState(false); // Tracks if the form is in edit mode
  const [recordsData, setRecordsData] = useState([]); // Data for the DataTable
  const [formData, setFormData] = useState({
    owner: "",
    date: "",
    booking: "",
    description: "",
    status: "Pending" // Default status
  });

  const [owners, setOwners] = useState([]);
  const [bookings, setBookings] = useState([]); // To store all bookings
  const [filteredBookings, setFilteredBookings] = useState([]); // To store bookings based on selected owner
  const [editId, setEditId] = useState(null); // Track the record to edit

  // Fetch owners
  const fetchOwners = async () => {
    try {
      const response = await fetch("/api/owner");
      if (!response.ok) throw new Error("Failed to load owners");

      const data = await response.json();
      setOwners(data.Owners); // Assuming owners data structure
    } catch (error) {
      MySwal.fire("Error", "Failed to load owners", "error");
    }
  };

  // Fetch all bookings (will filter them later)
  const fetchBookings = async () => {
    try {
      const response = await fetch("/api/booking");
      if (!response.ok) throw new Error("Failed to load bookings");

      const data = await response.json();
      setBookings(data.bookings); // Store all bookings
    } catch (error) {
      MySwal.fire("Error", "Failed to load bookings", "error");
    }
  };

  // Fetch all notifications data
  const fetchData = async () => {
    try {
      const response = await fetch("/api/notification");
      if (!response.ok) throw new Error("Failed to load data");

      const data = await response.json();
      const formattedData = data.notifications.map((record) => ({
        id: record._id,
        ownerId: record.owner, // Store the owner ID
        date: new Date(record.date).toISOString().split("T")[0],
        bookingId: record.booking, // Store the booking ID
        description: record.description,
        status: record.status || "Pending" // Handle case where status might not exist
      }));
      setRecordsData(formattedData);
    } catch (error) {
      MySwal.fire("Error", "Failed to load data", "error");
    }
  };

  // Get owner's name from ownerId
  const getOwnerName = (ownerId) => {
    const owner = owners.find((owner) => owner._id === ownerId);
    return owner ? owner.name : "Unknown Owner";
  };

  // Get booking's service name from bookingId
  const getBookingServiceName = (bookingId) => {
    const booking = bookings.find((booking) => booking._id === bookingId);
    return booking ? booking.selectedService : "Unknown Service";
  };

  // Filter bookings based on selected owner
  const filterBookingsByOwner = (ownerId) => {
    const filtered = bookings.filter((booking) => booking.ownerId === ownerId);
    setFilteredBookings(filtered);
  };

  const formatDate = (date) => {
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, '0'); // Get the day and pad with zero if needed
    const month = String(d.getMonth() + 1).padStart(2, '0'); // Get the month (0-based index) and pad
    const year = d.getFullYear(); // Get the full year
  
    return `${day}/${month}/${year}`; // Return formatted date
  };

  // Add or edit a record
  const handleSubmit = async () => {
    const method = editMode ? "PUT" : "POST";
    const url = editMode ? `/api/notification/${editId}` : "/api/notification";
  
    try {
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          date: formData.date // Keep it as is (already in yyyy-mm-dd format)

        })
      });
  
      if (!response.ok) throw new Error("Failed to save data");
  
      MySwal.fire(
        "Success",
        editMode ? "Record updated!" : "Record added!",
        "success"
      );
  
      fetchData(); // Refresh the data after adding or editing
      setFormData({
        owner: "",
        date: "",
        booking: "",
        description: "",
        status: "Pending"
      }); // Reset form
      setModal1(false); // Close modal
      setEditMode(false); // Reset edit mode
    } catch (error) {
      MySwal.fire("Error", error.message, "error");
    }
  };
  

  // Open modal for adding new record
  const handleAddClick = () => {
    setFormData({
      owner: "",
      date: "",
      booking: "",
      description: "",
      status: "Pending"
    });
    setEditMode(false);
    setModal1(true);
  };

  // Open modal for editing a record
  const handleEditClick = (id) => {
    const selectedRecord = recordsData.find((record) => record.id === id);
    if (selectedRecord) {
      setFormData({
        owner: selectedRecord.ownerId,
        date: selectedRecord.date,
        booking: selectedRecord.bookingId,
        description: selectedRecord.description,
        status: selectedRecord.status
      });
      setEditId(id);
      setEditMode(true);
      setModal1(true);
    }
  };

  // Delete a record
  const handleDeleteClick = async (id) => {
    MySwal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        deleteRecord(id);
      }
    });
  };

  const deleteRecord = async (id) => {
    try {
      const response = await fetch(`/api/notification/${id}`, {
        method: "DELETE"
      });
      if (!response.ok) throw new Error("Failed to delete record");

      MySwal.fire("Deleted!", "Record deleted successfully!", "success");
      fetchData(); // Refresh data after deletion
    } catch (error) {
      MySwal.fire("Error", "Failed to delete record", "error");
    }
  };

  useEffect(() => {
    fetchOwners();
    fetchBookings(); // Fetch all bookings on load
    fetchData();
  }, []);

  return (
    <div className="panel mt-6">
      <h5 className="mb-5 text-lg font-semibold dark:text-white-light">
        Records
      </h5>

      <button className="btn btn-primary mb-4" onClick={handleAddClick}>
        <IconPlus /> Add Record
      </button>

      <DataTable
        records={recordsData}
        columns={[
          {
            accessor: "owner",
            title: "Parent Name",
            render: (row) => getOwnerName(row.ownerId) // Fetch and display owner name
          },

          {
            accessor: "date",
            title: "Date",
            render: (row) => new Date(row.date).toLocaleDateString() 
// Display the date in a readable format
          },

          {
            accessor: "booking",
            title: "Service Name",
            render: (row) => getBookingServiceName(row.bookingId) // Fetch and display service name
          },
          {
            accessor: "description",
            title: "Description",
            render: (row) => row.description
          },
          {
            accessor: "status",
            title: "Status",
            render: (row) => row.status // Display the status
          },
          {
            accessor: "actions",
            title: "Actions",
            render: (row) => (
              <div className="flex space-x-2">
                <button
                  className="btn btn-sm btn-primary"
                  onClick={() => handleEditClick(row.id)}
                >
                  <IconPencil />
                </button>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => handleDeleteClick(row.id)}
                >
                  <IconTrash />
                </button>
              </div>
            )
          }
        ]}
        loading={recordsData.length === 0}
      />

      {/* Modal for Adding/Editing */}
      <Transition appear show={modal1} as={Fragment}>
        <Dialog as="div" open={modal1} onClose={() => setModal1(false)}>
          <div className="fixed inset-0 z-[999] overflow-y-auto bg-[black]/60">
            <div className="flex min-h-screen items-start justify-center px-4">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="panel my-8 w-full max-w-lg overflow-hidden rounded-lg border-0 p-0 text-black dark:text-white-dark">
                  <div className="flex items-center justify-between border-b border-white-light/10 px-5 py-3 dark:border-[#191e3a]">
                    <h5 className="text-lg font-bold">
                      {editMode ? "Edit Record" : "Add Record"}
                    </h5>
                    <button
                      type="button"
                      className="text-white-dark hover:text-dark"
                      onClick={() => setModal1(false)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                      >
                        <path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z" />
                      </svg>
                    </button>
                  </div>

                  <div className="p-5">
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        handleSubmit();
                      }}
                      className="space-y-5"
                    >
                      <div>
                        <label htmlFor="owner">Parent</label>
                        <select
                          value={formData.owner}
                          onChange={(e) => {
                            const ownerId = e.target.value;
                            setFormData({ ...formData, owner: ownerId });

                            // Fetch and filter bookings for selected owner
                            filterBookingsByOwner(ownerId);
                          }}
                          className="form-input"
                        >
                          <option value="">Select Parent</option>
                          {Array.isArray(owners) &&
                            owners.map((owner) => (
                              <option key={owner._id} value={owner._id}>
                                {owner.name}
                              </option>
                            ))}
                        </select>
                      </div>

                      <div>
                        <label htmlFor="booking">Booking</label>
                        <select
                          value={formData.booking}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              booking: e.target.value
                            })
                          }
                          className="form-input"
                        >
                          <option value="">Select Booking</option>
                          {Array.isArray(filteredBookings) &&
                            filteredBookings.map((booking) => (
                              <option key={booking._id} value={booking._id}>
                                {booking.selectedService}
                              </option>
                            ))}
                        </select>
                      </div>

                      <div>
                        <label htmlFor="date">Date</label>
                        <Flatpickr
                          value={formData.date}
                          onChange={([date]) =>
                            setFormData({
                              ...formData,
                              date: date.toISOString().split("T")[0] // Format the date to yyyy-mm-dd
                            })
                          }
                          options={{
                            dateFormat: "d-m-y" // Set the date format
                          }}
                          className="form-input"
                        />
                      </div>

                      <div>
                        <label htmlFor="description">Description</label>
                        <textarea
                          value={formData.description}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              description: e.target.value
                            })
                          }
                          className="form-input"
                        />
                      </div>

                      <div>
                        <label htmlFor="status">Status</label>
                        <select
                          value={formData.status}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              status: e.target.value
                            })
                          }
                          className="form-input"
                        >
                          <option value="Pending">Pending</option>
                          <option value="Completed">Completed</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      </div>

                      <button type="submit" className="btn btn-primary mt-6">
                        {editMode ? "Update" : "Submit"}
                      </button>
                    </form>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};

export default ComponentsDatatablesNotification;
