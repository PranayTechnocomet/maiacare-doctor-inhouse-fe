import React, { ChangeEvent, useEffect, useState } from 'react';
import { Container, Row, Col, Form, Table, Accordion } from 'react-bootstrap';
import Add from "../../assets/images/Add.png";
import Delete from "../../assets/images/Delete.png";
import LightEditimg from "../../assets/images/LightEditimg.png";
import Pdfimg from "../../assets/images/Pdfimg.png";
import Download from "../../assets/images/Download.png";
import Image from 'next/image';
import { useRouter } from "next/navigation";
// import Modal from "../ui/Modal";
import ContentContainer from '../ui/ContentContainer';
import Modal from '../ui/Modal';
import { InputFieldGroup } from '../ui/InputField';
import Button from '../ui/Button';
import toast from 'react-hot-toast';
import { InputSelect } from '../ui/InputSelect';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { addQualification, deleteQualification, editQualification, getLoggedInUser } from '@/utils/apis/apiHelper';
interface DocumentType {
  originalName?: string;
  reportName?: string;
  aadharNumber?: string;
  panNumber?: string;
  licenceNumber?: string;
  filePath: string;
  updatedAt?: string;
    name: string;
    date: string;
}

const ProfileBasicDetails = () => {
  interface FormError {
    [key: string]: string;

  }
  const router = useRouter();
  const initialFormError: FormError = {};
  const [formError, setFormError] = useState<FormError>(initialFormError);
  const [activeTab,] = useState('basic');
  const [startTime, setStartTime] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [endTime, setEndTime] = useState("");

   const [loading, setLoading] = useState(true);
  interface qualificationType {
    degree: string,
    fieldOfStudy: string,
    university: string,
    startYear: string | number,
    endYear: string | number,
    _id: string
  }
  const [defaultQualifications, setDefaultQualifications] = useState<any[]>([]);
  const [showQualificationModal, setShowQualificationModal] = useState(false);
  const [selectedQualificationId, setSelectedQualificationId] = useState<string | null>(null);
  type FormData = {
    MF: string;
    SS: string;
    Time: string;
    Timer: string;

    degree: string;
    fieldOfStudy: string;
    university: string;
    startYear: string;
    endYear: string;

  };

  const initialFormData: FormData = {
    MF: "",
    SS: "",
    Time: "",
    Timer: "",
    degree: "",
    fieldOfStudy: "",
    university: "",
    startYear: "",
    endYear: ""
  };

  const [formData, setFormData] = useState<FormData>(initialFormData);

  const [qualifications, setQualifications] = useState<FormData[]>([
    { ...initialFormData },
  ]);
  const [formErrors, setFormErrors] = useState([
    { degree: "", fieldOfStudy: "", university: "", startYear: "", endYear: "" }
  ]);


 const [documents, setDocuments] = useState<DocumentType[]>([]);
const [operationalHours, setOperationalHours] = useState<OperationalHour[]>([]);



  const handleDelete = (id: string) => {
    // const updated = defaultQualifications.filter((_, i) => i !== index);
    // setDefaultQualifications(updated);
    console.log("ID: ", id);
    
    deleteQualification(id)
      .then((response) => {

        if (response.status == 200) {
          console.log("qualifications deleted");
          getUser()
        } else {
          console.log("Error");
        }

      })
      .catch((err) => {
        console.log("Qualification deleting error", err);
      });
  };

  const handleDownload = (url: string, name: string) => {
    const link = document.createElement("a");
    link.href = url;
    link.download = name; // 👈 download name set
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // const operationalHours = [
  //   { days: "Mon to Fri", time: "10 AM – 5 PM" },
  //   { days: "Sat & Sun", time: "10 AM – 2 PM" },
  // ];

  //================  + add  Modal all data below ============= //

  const handleOpen = () => {
    // modal open in clean state and clear data 
    setFormData(initialFormData);
    setFormError(initialFormError);
    setFormErrors([]);
    setQualifications([{ ...initialFormData }]); // one  blank qualification row

    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);

    // Modal close data clear
    setFormData(initialFormData);
    setFormError(initialFormError);
    setFormErrors([]);
    setQualifications([{ ...initialFormData }]); // reset to 1 blank
  };


  const yearOptions = Array.from({ length: 51 }, (_, i) => {
    const year = 2000 + i;
    return { id: year.toString(), value: year.toString(), label: year.toString() };
  });

  const validateForm = (data: FormData): FormError => {
    const errors: FormError = {};
    return errors;
  };
  const validateForm1 = (quals: typeof qualifications) => {
    const errors = quals.map((q) => ({

      degree: !q.degree ? "Degree is required" : "",
      fieldOfStudy: !q.fieldOfStudy ? "fieldOfStudy is required" : "",
      university: !q.university ? "University is required" : "",
      startYear: !q.startYear ? "Start Year is required" : "",
      endYear: !q.endYear ? "End Year is required" : "",
    }));
    return errors;
  };

  // ✅ Function to add data
  const handleAddQualification = () => {
    setQualifications([...qualifications, { ...initialFormData }]);
    // ADDD Qualifications validtation msg 
    setFormErrors([
      ...formErrors,
      { degree: "", fieldOfStudy: "", university: "", startYear: "", endYear: "" }
    ]);
  };
  const handleRemoveQualification = (index: number) => {
    const updated = [...qualifications];
    updated.splice(index, 1);
    setQualifications(updated);
  };

  const handleSave = () => {
    // 🔹 Run validations
    const errors = validateForm(formData);          // single form
    const qualErrors = validateForm1(qualifications); // multi rows

    setFormError(errors);
    setFormErrors(qualErrors); // ✅ set array  

    const hasQualError = qualErrors.some((err) =>
      Object.values(err).some((msg) => msg !== "")
    );

    if (Object.keys(errors).length === 0 && !hasQualError) {
      // 🔹 Convert filled qualifications into display format
      const newItems = qualifications
        .filter(
          (q) =>
            q.degree && q.fieldOfStudy && q.university && q.startYear && q.endYear
        )
        .map((q) => ({
          title: `${q.degree} - ${q.fieldOfStudy}`,
          university: q.university,
          years: `${q.startYear} - ${q.endYear}`,
          degree: q.degree,
          fieldOfStudy: q.fieldOfStudy,
          startYear: q.startYear,
          endYear: q.endYear
        }));

      // if (newItems.length === 0) {
      //   alert("Please fill all fields before saving.");
      //   return;
      // }

      // 🔹 Update default qualifications
      setDefaultQualifications((prev) => [...prev, ...newItems]);

      console.log("Form submitted ✅", { formData, qualifications });

      // 🔹 Success → close modal + reset data

      const passData = qualifications.map((q) => ({
        degree: q.degree,
        fieldOfStudy: q.fieldOfStudy,
        university: q.university,
        startYear: Number(q.startYear),
        endYear: Number(q.endYear),
      }));

      console.log("Send data:", passData);


      addQualification(passData)
        .then((response) => {

          if (response.status == 200) {
            console.log("Qualification Added: ", response.data);
            setShowModal(false);
            setFormData(initialFormData);
            setFormError(initialFormError);
            setFormErrors([]);
            setQualifications([{ ...initialFormData }]);
            getUser()
            toast.success("Data saved successfully!", {
              position: "top-right",
              // autoClose: 3000,
            });
          } else {
            console.log("Error");
          }

        })
        .catch((err) => {
          console.log("Qualification adding error", err);
        });

    }
    else {
      console.log("Form has errors : ", { errors, qualErrors });
    }
  };
  // + add Qualification button diable data show after unable
  const isQualificationComplete = (q: any) => {
    return q.degree && q.fieldOfStudy && q.university && q.startYear && q.endYear;
  };

  // ===== Edit button click in modal open ================
  const openQualificationModal = (index: number, id:string) => {
    setEditIndex(index);
    setFormData(defaultQualifications[index]); // je data show thayu e prefill karo
    setShowQualificationModal(true); // modal open
    setSelectedQualificationId(id)
  };

  const closeQualificationModal = () => setShowQualificationModal(false);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setFormError((prev) => ({ ...prev, [name]: "" }));
  };

  const EditValidtation = (data: FormData): FormError => {
    const errors: FormError = {};

    if (!data.degree.trim()) errors.degree = "Degree is required";
    if (!data.fieldOfStudy.trim()) errors.fieldOfStudy = "fieldOfStudy is required";
    if (!data.university.trim()) errors.university = "University is required";
    if (!data.startYear) errors.startYear = "Start year is required";
    if (!data.endYear) errors.endYear = "End year is required";

    return errors;
  };

  const handleEditSave = () => {
    const errors = EditValidtation(formData);
    setFormError(errors);
    // console.log("Qualification:", id);
    
    if (Object.keys(errors).length > 0) return; // ❌ don't save if errors
    console.log("formData", formData);
    
    editQualification(formData, selectedQualificationId)
      .then((response) => {

        if (response.status == 200) {
          console.log("Qualification Edited : ", response.data);
          getUser()
        } else {
          console.log("Error");
        }

      })
      .catch((err) => {
        console.log("Qualification adding error", err);
      });

    console.log("Form updated:", formData);

    closeQualificationModal();
    setEditIndex(null);
  };

  const [editIndex, setEditIndex] = useState<number | null>(null); // track current editing row
interface OperationalHour {
  _id: string;
  day: string;
  openTime: string;
  closeTime: string;
}

  interface Qualification {
    degree: string;
    fieldOfStudy: string;
    university: string;
    startYear: number;
    endYear: number;
    _id: string;
  }
  interface DoctorDataType {
    _id: string;
    name: string;
    profilePicture: string;
    specialty: string;
    yearsOfExperience: number;
    dob: string;
    gender: string;
    contactNumber: string;
    email: string;
    about: string;
    servicesOffered: string[];
    operationalHours: OperationalHour[];
    qualifications: Qualification[];
    fees: number;
    clinicIds: string[];
    doctorType: string;
    doctor_id_other: string;
    other_type_flag: string;
    memberSince: string;
    documents: any[];
  }
  const [user, setUser] = useState<DoctorDataType | null>(null)

// const getUser = () => {
//   getLoggedInUser()
//     .then((response) => {
//       if (response.status == 200) {
//         const userData = response.data.data;

//         // Normalize documents
//         const normalizedDocs = userData.documents.map((doc: any, i: number) => ({
//           ...doc,
//           originalName: doc.originalName || doc.reportName || doc.name || `Document-${i + 1}`,
//           updatedAt: doc.updatedAt || doc.uploadedAt || doc.date || null,
//         }));

//         setUser(userData);
//         setDocuments(normalizedDocs);
//         setDefaultQualifications(userData.qualifications);

//         // ⭐ ADD THIS
//         setOperationalHours(userData.operationalHours || []);

//       } else {
//         console.log("Error");
//       }
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// };
const getUser = () => {
  setLoading(true);  // start loading

  getLoggedInUser()
    .then((response) => {
      if (response.status === 200) {
        const userData = response.data.data;

        // Normalize documents
        const normalizedDocs = userData.documents?.map((doc: any, i: number) => ({
          ...doc,
          originalName: doc.originalName || doc.reportName || doc.name || `Document-${i + 1}`,
          updatedAt: doc.updatedAt || doc.uploadedAt || doc.date || null,
        })) || [];

        setUser(userData);
        setDocuments(normalizedDocs);
        setDefaultQualifications(userData.qualifications || []);
        setOperationalHours(userData.operationalHours || []);

      } else {
        console.log("Error");
      }

      setLoading(false); // stop loading
    })
    .catch((err) => {
      console.log(err);
      setLoading(false); // stop loading on error
    });
};

  useEffect(() => {
    getUser()
  }, [])

  return (
    // <Container fluid className="mt-3">
    <div>
      <Row>

        {/* =====LEFT COLUMN PART ======== */}


        <Col xl={8} md={7}>

{/* Operational Hours & Days */}
<div>
  <ContentContainer className="mt-4">
    <div className="d-flex flex-column flex-md-row justify-content-md-between align-items-center text-center text-md-start mb-3">
        {loading ? (
                                          <Skeleton width={120} height={18} />
                                      ) : (
      <h5 className="profile-card-main-titile mb-2 mb-md-0">
        Timings
      </h5>
                                      )}
    </div>
      {loading ? (
                                          <Skeleton width={170} height={25} />
                                      ) : (
    <div>
      {operationalHours?.length > 0 ? (
        (() => {
          // Group continuous days with same time
          const groups = [];
          let start = operationalHours[0];
          let prev = operationalHours[0];

          for (let i = 1; i < operationalHours.length; i++) {
            const curr = operationalHours[i];

            if (
              curr.openTime === prev.openTime &&
              curr.closeTime === prev.closeTime
            ) {
              // continue grouping
              prev = curr;
            } else {
              groups.push({ start, end: prev });
              start = curr;
              prev = curr;
            }
          }

          groups.push({ start, end: prev });

          return groups.map((g, index) => (
            <div key={index} className="mb-3">
              <p className="basic-detail-text mb-1">
            <span className=''>  {g.start.day} {g.start.day !== g.end.day && `- ${g.end.day}`} :-</span>
             
              <span className='ms-1'> {g.start.openTime} - {g.start.closeTime}</span> 
              </p>
            </div>
          ));
        })()
      ) : (
        <p className="text-muted">No operational hours available</p>
      )}
    </div>
                                      )}
  </ContentContainer>
</div>


          {/* Qualification */}
       <div>
  <ContentContainer className='mt-4'>

    {/* ---------- HEADER SKELETON ---------- */}
    <div className="d-flex justify-content-between align-items-center mb-3">
      {loading ? (
        <>
          <Skeleton width={140} height={20} />
          <Skeleton width={35} height={35} circle />
        </>
      ) : (
        <>
          <h5 className="profile-card-main-titile">Qualification</h5>

          <Button onClick={handleOpen} className="profile-card-boeder profile-card-button bg-transparent" variant="outline">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none"
                 xmlns="http://www.w3.org/2000/svg">
              <path d="M18 9C18 9.19891 17.921 9.38968 17.7803 9.53033C17.6397
              9.67098 17.4489 9.75 17.25 9.75H9.75V17.25C9.75 17.4489 9.67098
              17.6397 9.53033 17.7803C9.38968 17.921 9.19891 18 9 18C8.80109 18
              8.61032 17.921 8.46967 17.7803C8.32902 17.6397 8.25 17.4489 8.25
              17.25V9.75H0.75C0.551088 9.75 0.360322 9.67098 0.21967 9.53033C0.0790178
              9.38968 0 9.19891 0 9C0 8.80109 0.0790178 8.61032 0.21967 8.46967C0.360322
              8.32902 0.551088 8.25 0.75 8.25H8.25V0.75C8.25 0.551088 8.32902 0.360322
              8.46967 0.21967C8.61032 0.0790178 8.80109 0 9 0C9.19891 0 9.38968 0.0790178
              9.53033 0.21967C9.67098 0.360322 9.75 0.551088 9.75 0.75V8.25H17.25C17.4489
              8.25 17.6397 8.32902 17.7803 8.46967C17.921 8.61032 18 8.80109 18 9Z"
                fill="#2B4360" />
            </svg>
          </Button>
        </>
      )}
    </div>

    {/* ---------- BODY SKELETON ---------- */}
    {loading ? (
      <>
        {/* card skeleton */}
        <div className="p-3 mb-3 bg-white border rounded-4">
          <Skeleton width={180} height={18} className="mb-2" />
          <Skeleton width={140} height={15} className="mb-2" />
          <Skeleton width={100} height={15} />
        </div>

        <div className="p-3 mb-3 bg-white border rounded-4">
          <Skeleton width={180} height={18} className="mb-2" />
          <Skeleton width={140} height={15} className="mb-2" />
          <Skeleton width={100} height={15} />
        </div>
      </>
    ) : (
      <>
        {defaultQualifications.length === 0 ? (
          <div className="text-center text-muted p-4 border rounded-4">
            "Data not found. Please Add Data"
          </div>
        ) : (
          defaultQualifications.map((item, idx) => (
            <div
              key={idx}
              className="d-flex justify-content-between align-items-start p-3 mb-3 bg-white border rounded-4 profile-card-boeder"
            >
              <div>
                <div className="card-feild">{item.degree}</div>
                <div className="card-university-text">{item.university}</div>
                <div className="card-year">{`${item.startYear} - ${item.endYear}`}</div>
              </div>

              <div className="d-flex gap-2">
                <Button
                  onClick={() => openQualificationModal(idx, item._id)}
                  className="border p-2 rounded-3 edit-del-btn bg-transparent"
                  variant="outline"
                >
                  <Image src={LightEditimg} alt="Edit" width={18} height={18} />
                </Button>

                <Button
                  className="border p-2 rounded-2 edit-del-btn bg-transparent"
                  onClick={() => handleDelete(item._id)}
                  variant="outline"
                >
                  <Image src={Delete} alt="Delete" width={18} height={18} />
                </Button>
              </div>
            </div>
          ))
        )}
      </>
    )}

  </ContentContainer>
</div>


        </Col>


        {/* ======RIGHT COLUMN =========== */}
        {/* About */}

       <Col xl={4} md={5}>
  <div>
    <ContentContainer className="mt-4">

      {/* -------- ABOUT TITLE SKELETON -------- */}
      {loading ? (
        <Skeleton width={80} height={20} className="mb-2" />
      ) : (
        <h5 className="profile-card-main-titile">About</h5>
      )}

      {/* -------- ABOUT TEXT SKELETON -------- */}
      {loading ? (
        <>
          <Skeleton width={"100%"} height={14} className="mb-2" />
          <Skeleton width={"95%"} height={14} className="mb-2" />
          <Skeleton width={"80%"} height={14} />
        </>
      ) : (
        <p className="mb-0 about-text">
          {user ? user.about : ""}
        </p>
      )}

    </ContentContainer>
  </div>

  {/* Documents */}
  <div>
    <ContentContainer className="mt-4">

      {/* -------- DOCUMENTS TITLE SKELETON -------- */}
      {loading ? (
        <Skeleton width={120} height={20} className="mb-4" />
      ) : (
        <h5 className="mb-4 profile-card-main-titile">Documents</h5>
      )}

      {/* -------- DOCUMENTS LIST SKELETON -------- */}
      {loading ? (
        <>
          {/* Skeleton card 1 */}
          <div className="d-flex justify-content-between align-items-center border profile-card-boeder p-3 mb-3 document-main-border">
            <div className="d-flex align-items-center">
              <Skeleton width={40} height={40} className="me-3" />
              <div>
                <Skeleton width={140} height={16} className="mb-2" />
                <Skeleton width={90} height={14} />
              </div>
            </div>
            <Skeleton width={35} height={35} className="rounded" />
          </div>

          {/* Skeleton card 2 */}
          <div className="d-flex justify-content-between align-items-center border profile-card-boeder p-3 mb-3 document-main-border">
            <div className="d-flex align-items-center">
              <Skeleton width={40} height={40} className="me-3" />
              <div>
                <Skeleton width={140} height={16} className="mb-2" />
                <Skeleton width={90} height={14} />
              </div>
            </div>
            <Skeleton width={35} height={35} className="rounded" />
          </div>
        </>
      ) : (
        documents.map((doc, index) => {
          const docName =
            doc.originalName ||
            doc.reportName ||
            doc.aadharNumber ||
            doc.panNumber ||
            doc.licenceNumber ||
            `Document-${index + 1}`;

          const formattedDate = doc.updatedAt
            ? new Date(doc.updatedAt).toLocaleDateString()
            : "";

          return (
            <div
              key={index}
              className="d-flex justify-content-between align-items-center border profile-card-boeder p-3 mb-3 document-main-border"
            >
              <div className="d-flex align-items-center">
                <Image src={Pdfimg} alt="pdf" width="40" className="me-3" />

                <div>
                  <div className="card-feild">{docName}</div>
                  <div className="card-year">{formattedDate}</div>
                </div>
              </div>

              <button
                className="d-flex bg-white justify-content-center align-items-center border profile-card-boeder rounded Download-border"
                onClick={() => handleDownload(`/files/${doc.name}.pdf`, doc.name)}
              >
                <Image src={Download} alt="download" width={25} height={25} />
              </button>
            </div>
          );
        })
      )}

    </ContentContainer>
  </div>
</Col>

      </Row>
    </div>
    // </Container>
  );
};

export default ProfileBasicDetails;
