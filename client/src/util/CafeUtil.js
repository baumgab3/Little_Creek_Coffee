
const getCafes = () => {
    const cafes = [
        {
            location: "Downtown Milwaukee",
            address: "211 Milwaukee Ave",
            phone: "(262) 434-3456",
            hours: [
                "Monday - Saturday 6:00AM - 5:00PM",
                "Sunday 7:00AM - 5:00PM"
            ],
            googleMapsUrl: "https://www.google.com/maps/place/Milwaukee,+WI/@43.0580241,-88.1323026,11z/data=!3m1!4b1!4m6!3m5!1s0x880502d7578b47e7:0x445f1922b5417b84!8m2!3d43.0389025!4d-87.9064736!16zL20vMGR5bDk",
        },
        {
            location: "South Milwaukee",
            address: "6544 West Street",
            phone: "(262) 654-6554",
            hours: [
                "Monday - Saturday 6:00AM - 5:00PM",
                "Sunday 7:00AM - 5:00PM"
            ],
            googleMapsUrl: "https://www.google.com/maps/place/Milwaukee,+WI/@43.0580241,-88.1323026,11z/data=!3m1!4b1!4m6!3m5!1s0x880502d7578b47e7:0x445f1922b5417b84!8m2!3d43.0389025!4d-87.9064736!16zL20vMGR5bDk",
        },
        {
            location: "St. Francis",
            address: "444 East Street",
            phone: "(262) 994-3456",
            hours: [
                "Monday - Saturday 6:00AM - 5:00PM"
            ],
            googleMapsUrl: "https://www.google.com/maps/place/Milwaukee,+WI/@43.0580241,-88.1323026,11z/data=!3m1!4b1!4m6!3m5!1s0x880502d7578b47e7:0x445f1922b5417b84!8m2!3d43.0389025!4d-87.9064736!16zL20vMGR5bDk",
        },
        {
            location: "Cudahy",
            address: "999 York Ave",
            phone: "(262) 566-1134",
            hours: [
                "Monday - Saturday 6:00AM - 5:00PM",
                "Sunday 7:00AM - 2:00PM"
            ],
            googleMapsUrl: "https://www.google.com/maps/place/Milwaukee,+WI/@43.0580241,-88.1323026,11z/data=!3m1!4b1!4m6!3m5!1s0x880502d7578b47e7:0x445f1922b5417b84!8m2!3d43.0389025!4d-87.9064736!16zL20vMGR5bDk",
        },
        {
            location: "Shorewood",
            address: "543 Oak Ave",
            phone: "(262) 888-3456",
            hours: [
                "Monday - Saturday 6:00AM - 7:00PM",
                "Sunday 7:00AM - 7:00PM"
            ],
            googleMapsUrl: "https://www.google.com/maps/place/Milwaukee,+WI/@43.0580241,-88.1323026,11z/data=!3m1!4b1!4m6!3m5!1s0x880502d7578b47e7:0x445f1922b5417b84!8m2!3d43.0389025!4d-87.9064736!16zL20vMGR5bDk",
        },
    ]

    return cafes
}

export {
    getCafes,
}