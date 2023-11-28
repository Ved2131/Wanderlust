const mongoose=require("mongoose");

const sampleListings=[
    {
      title: "Cozy Apartment in the Heart of the City",
      description: "A comfortable apartment with great city views.",
      image: {
        filename:"listingimage",
        url:"https://images.unsplash.com/photo-1566073771259-6a8506099945?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTY4MTQwOTY5OQ&ixlib=rb-4.0.3&q=80&w=1080",
        
      },
      price: 1200,
      location: "Downtown",
      country: "United States",
      geometry:{
        type: 'Point',
        coordinates:[149.1300,35.2809],
      }
    },
    {
      title: "Luxury Beachfront Villa",
      description: "Enjoy the breathtaking ocean views from this beautiful villa.",
      image: {
        filename:"listingimage",
        url: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTY4MTU2MjA3Mg&ixlib=rb-4.0.3&q=80&w=1080",
      },
      price: 2500,
      location: "Beachfront",
      country: "Spain",
      geometry:{
        type: 'Point',
        coordinates:[149.1300,35.2809],
      }
    },
    {
      title: "Mountain Cabin Retreat",
      description: "Escape to the mountains in this cozy cabin.",
      image:{
        filename:"listingimage",
        url: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTY4MTMxNjE0Mg&ixlib=rb-4.0.3&q=80&w=1080",
      },
      price: 800,
      location: "Mountain Valley",
      country: "Canada",
      geometry:{
        type: 'Point',
        coordinates:[149.1300,35.2809],
      }
    },
    {
      title: "Charming Cottage in the Countryside",
      description: "A lovely cottage surrounded by nature.",
      image:{
        filename:"listingimage",
        url:"https://images.unsplash.com/photo-1568084680786-a84f91d1153c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTY4MTc3MTI0MA&ixlib=rb-4.0.3&q=80&w=1080",
      },
      price: 600,
      location: "Rural Area",
      country: "United Kingdom",
      geometry:{
        type: 'Point',
        coordinates:[149.1300,35.2809],
      }
    },
    {
      title: "Urban Loft with City Views",
      description: "Modern loft with stunning city skyline views.",
      image:{
      filename:"listingimage",
      url:"https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTY4MTMyMTc5MQ&ixlib=rb-4.0.3&q=80&w=1080",
      }, 
      price: 1800,
      location: "City Center",
      country: "United States",
      geometry:{
        type: 'Point',
        coordinates:[149.1300,35.2809],
      }
    },
    {
      title: "Secluded Forest Cabin",
      description: "Get away from it all in this secluded cabin in the woods.",
      image: {
      filename:"listingimage",
      url:"https://plus.unsplash.com/premium_photo-1675745329378-5573c360f69f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTY5OTcxMTg5MQ&ixlib=rb-4.0.3&q=80&w=1080",
      },
      price: 1000,
      location: "Forest Retreat",
      country: "Canada",
      geometry:{
        type: 'Point',
        coordinates:[149.1300,35.2809],
      }
    },
    {
      title: "Historic Townhouse in the Old City",
      description: "A historic townhouse with a rich heritage.",
      image: {
        filename:"listingimage",
        url:"https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTY4MTU2MjA3Mg&ixlib=rb-4.0.3&q=80&w=1080",
      },
      price: 1500,
      location: "Old City",
      country: "France",
      geometry:{
        type: 'Point',
        coordinates:[149.1300,35.2809],
      }
    },
    {
      title: "Beachfront Bungalow",
      description: "Wake up to the sound of waves in this beachfront bungalow.",
      image: {
        filename:"listingimage",
        url: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTY4Mjk0NzY1NQ&ixlib=rb-4.0.3&q=80&w=1080",
      },
      price: 1800,
      location: "Beachfront",
      country: "Maldives",
      geometry:{
        type: 'Point',
        coordinates:[149.1300,35.2809],
      }
    },
    {
      title: "Ski Chalet in the Alps",
      description: "Hit the slopes from this charming ski chalet.",
      image:{
      filename:"listingimage",  
      url:"https://images.unsplash.com/photo-1578683010236-d716f9a3f461?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTY4MTM2Njc3OQ&ixlib=rb-4.0.3&q=80&w=1080",
      },
      price: 2000,
      location: "Alpine Village",
      country: "Switzerland",
      geometry:{
        type: 'Point',
        coordinates:[149.1300,35.2809],
      }
    },
    {
      title: "Riverside Retreat",
      description: "Relax by the river in this serene retreat.",
      image: {
      filename:"listingimage",
      url:"https://images.unsplash.com/photo-1586611292717-f828b167408c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTY4MTU2MjA0Nw&ixlib=rb-4.0.3&q=80&w=1080",
      },
      price: 900,
      location: "Riverside",
      country: "Australia",
      geometry:{
        type: 'Point',
        coordinates:[149.1300,35.2809],
      }
    },
    {
      title: "Firebase Atreat",
      description: "Relax by the river in this serene retreat.",
      image:{
      filename:"listingimage",
      url:"https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTY4MTQ1OTUyNA&ixlib=rb-4.0.3&q=80&w=1080",
      },
      price: 1400,
      location: "LakeArabic",
      country: "KathMando",
      geometry:{
        type: 'Point',
        coordinates:[149.1300,35.2809],
      }
    }
  ]
  
module.exports={data:sampleListings};