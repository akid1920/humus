import presidentImg from '../assets/president.jpg';
import gsImg from '../assets/gs.jpg';
import chiefAdvisorImg from '../assets/chief_advisor.jpg';

export const organizationData = {
    president: {
        id: 1,
        name: "Mridul Khandakar",
        role: "President",
        designation: "Session: 2021-22", // Using placeholder from image to show structure intent
        image: presidentImg
    },
    tier2: [ // VPs and GS
        {
            id: 2,
            name: "Jane Smith",
            role: "Vice-President-1",
            designation: "Professor Dr. Biswas Karabi Farhana",
            image: null
        },
        {
            id: 3,
            name: "Md. Mahfuzur Rahman Shawon",
            role: "General Secretary",
            designation: "Session: 2021-22",
            image: gsImg
        },
        {
            id: 4,
            name: "Fatema Tuz Zohra",
            role: "Vice-President-2",
            designation: "Professor Dr. Feroza Yasmin",
            image: null
        }
    ],
    tier3: [ // Treasurer, Org Sec, Joint Sec
        {
            id: 5,
            name: "RM Faizur Rahman PPM",
            role: "Organizing Secretary",
            designation: "",
            image: null
        },
        {
            id: 6,
            name: "Syed M Istiak",
            role: "Treasurer",
            designation: "",
            image: null
        },
        {
            id: 7,
            name: "Dr. Aminul Islam",
            role: "Joint Secretary",
            designation: "",
            image: null
        }
    ],
    tier4: [ // Special Secretaries
        {
            id: 8,
            name: "Dr. Mustak Ibn Ayub",
            role: "Public Relation Secretary",
            designation: "",
            image: null
        },
        {
            id: 9,
            name: "Shahrima Tanjin Arni",
            role: "International Affairs Secretary",
            designation: "",
            image: null
        }
    ],
    members: [
        { id: 10, name: "Prof. Dr. Gulshan Ara Latifa", role: "Member", image: null },
        { id: 11, name: "Prof. Dr. Engr Ayub Nabi Khan", role: "Member", image: null },
        { id: 12, name: "Prof. Dr. Md. Azizur Rahman", role: "Member", image: null },
        { id: 13, name: "Prof. Dr. Sangita Ahmed", role: "Member", image: null },
        { id: 14, name: "Agatha Gomes", role: "Member (BC Representative)", image: null },
        { id: 15, name: "Nazia Islam", role: "Member", image: null },
    ]
};

export const advisors = [
    {
        id: 101,
        name: "Bayazid Hossain",
        role: "Chief Advisor",
        designation: "Assistant Professor, SWED",
        image: chiefAdvisorImg
    }

];
