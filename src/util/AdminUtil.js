import LightbulbOutlinedIcon from '@mui/icons-material/LightbulbOutlined';
import FreeBreakfastOutlinedIcon from '@mui/icons-material/FreeBreakfastOutlined';
import RssFeedOutlinedIcon from '@mui/icons-material/RssFeedOutlined';
import LooksOutlinedIcon from '@mui/icons-material/LooksOutlined';
import HandymanOutlinedIcon from '@mui/icons-material/HandymanOutlined';
import WhatshotOutlinedIcon from '@mui/icons-material/WhatshotOutlined';


// returns string as lowercase with all spaces replaced with a '-'
const slugify = (toClean) => {
    return toClean.toLowerCase().replace(/\s+/g, " ").replace(/\s/g, "-");
}

// returns array for the 'Shop' option in the navbar
const getDropDownForShop = () => {
    const shopOptions = [
        {name: "Coffee", url: "/product-category/roast/light"},
        {name: "Subscription", url: "/product-category/subscription"},
        {name: "Cold Brew", url: "/product-category/cold-brew"},
        {name: "Merchandise", url: "/product-category/merchandise"},
        {name: "Coffee Box Sets", url: "/product-category/coffee-box-sets"},
        {name: "Gifts", url: "/product-category/gifts"},
        {name: "Gift Cards", url: "/product-category/gift-cards"},
        {name: "Tea", url: "/product-category/tea"},
        {name: "Sales & Bundles", url: "/product-category/sales"},
        {name: "Mobile App & Rewards", url: "/product-category/mobile-ordering"}
    ];

    return shopOptions;
}

// returns array for the 'Cafes' option in the navbar
const getDropDownForCafes = () => {
    const cafeOptions = [
        {name: "Vist a Cafe", url: "/cafes"},
        {name: "Order Ahead", url: "/TODO"}, //todo 
        {name: "Get the App", url: "/mobile-ordering"}
    ];

    return cafeOptions;
}

// returns array for the 'Learning' option in the navbar
const getDropDownForLearning = () => {
    const learningOptions = [
        {name: "Tours", url: "/public-classes"},
        {name: "Public Classes", url: "/public-classes"},
        {name: "Brewing Guides", url: "/brewing-guides"},
        {name: "Blog", url: "/blog"}
    ];

    return learningOptions;
}

// returns array for the 'About Us' option in the navbar
const getDropDownForAboutUs = () => {
    const aboutUsOptions = [
        {name: "Contact Us", url: "/contact"},
        {name: "Our Story", url: "/our-story"},
        {name: "Brewing Change", url: "/brewing-change"},
        {name: "Inside Little Creek", url: "/abc-corporation"},
        {name: "Join Our Team", url: "/join-our-team"}
    ];

    return aboutUsOptions;
}

// opens a url in a new window
const openURLInNewWindow = (url) => {
    window.open(url, '_blank', 'noreferrer');
}

// returns top navbar links
const getTopNavbarLinks = () => {
    const topNavOptions = [
        {name: "Get The App", url: "/mobile-ordering"},
        {name: "Brewing Change", url: "/brewing-change"},
        {name: "Join Our Team", url: "/join-our-team"},
        {name: "Wholesale Login", url: "/TODO"},
        {name: "Contact Us", url: "/contact"}
    ];

    return topNavOptions;
}

const getHighlighSectionInfo = (sectionName) => {
    if (sectionName.toLowerCase() === 'never stop learning') {
        return getLearningSection();
    }
    
    return getWholesaleSection();
}

const getLearningSection = () => {
    const learningInfo = {
        title: "Never Stop Learning",
        section: [
            {
                icon : <LightbulbOutlinedIcon fontSize="large" />,
                heading: "Public Classes",
                text: "Sign up for one of our public classes and learn hands-on how to pull a shot, create latte art, or simply brew your coffee like an actual Little Creek barista!",
                isLink: true,
                url: "/public-classes",
                buttonText: "check out our classes"
            },
            {
                icon : <FreeBreakfastOutlinedIcon fontSize="large" />,
                heading: "Brewing Guides",
                text: "Do you need tips on how to use your Aeropress or V60? Then check out one of our manual brewing guides so that you can brew a great cup of Little Creek Coffee at home.",
                isLink: true,
                url: "/brewing-guides",
                buttonText: "brew better"
            },
            {
                icon : <RssFeedOutlinedIcon fontSize="large" />,
                heading: "Little Creek Coffee Blog",
                text: "Get the inside scoop of how Little Creek Coffee operates. Just click over to our blog to learn about new coffees, new endeavors, and more.",
                isLink: true,
                url: "/blog",
                buttonText: "check out our classes"
            }
        ]
    };
    
    return learningInfo;
}

const getWholesaleSection = () => {
    const wholesaleInfo = {
        title: "wholesale information",
        section: [
            {
                icon : <LooksOutlinedIcon fontSize="large" />,
                heading: "Learn about Farm to Cup",
                text: "We work directly with farmers at origin countries in order to ensure transparency and quality of our coffee, and we share what we have learned with our customers and anyone who is coffee-curious. We call this \"Farm to Cup.\"", 
                isLink: false,
                url: "/category/farm-to-cup",
                buttonText: "read our blog"
            },
            {
                icon : <HandymanOutlinedIcon fontSize="large" />,
                heading: "Fix My Equipment",
                text: "We work with industry-leading equipment partners in support of you being able to brew the highest quality cup of coffee possible for your business. Our team of full-time technicians ensures your cafe equipment will operate at its absolute best.",
                isLink: false,
                url: "/contact",
                buttonText: "get in touch with us"
            },
            {
                icon : <WhatshotOutlinedIcon fontSize="large" />,
                heading: "Learn About Our Roast Levels",
                text: "We've been working hard to become better coffee roasters. After more than 25 years of experience, we know that we can still get better. Here's a visual of the process we have used to help us renovate and rejuvenate how we roast coffee.",
                isLink: false,
                url: "/2020/06/28/the-roast-spectrum/",
                buttonText: "check out our classes"
            }
        ]
    };

    return wholesaleInfo;
}

//returns faq sections for about us accordian
const getFAQs = () => {
    const FAQs = [
        {idx: 0, question: "What are the delivery charges for orders from the Online Shop?", answer: "Nothing. We rock free shipping on all orders. That said, if you need your order rushed, we can make that happen, but you're gonna have to pick up the tab."},
        {idx: 1, question: "Which payment methods are accepted in the Online Shop?", answer: "Credit Card, Debit Card, Amazon Pay, PayPal, and Republic Credits."},
        {idx: 2, question: "How long will delivery take?", answer: "Nothing. We rock free shipping on all orders. That said, if you need your order rushed, we can make that happen, but you're gonna have to pick up the tab."},
        {idx: 3, question: "How secure is shopping in the Online Shop? Is my data protected?", answer: "Pretty darn secure. Make sure you have a great password when you set up your account. Our server is secure in Odin's vault. So, we should be set unless Loki or Hela were to be resurrected and pursue a career in computer hacking."},
        {idx: 4, question: "What exactly happens after ordering?", answer: "Nothing. We rock free shipping on all orders. That said, if you need your order rushed, we can make that happen, but you're gonna have to pick up the tab."},
        {idx: 5, question: "WILL I RECEIVE TRACKING INFORMATION?", answer: "When you place an online order with us, you will receive an initial \"Order Received\" email with your receipt and order number.  Once we process your order and it leaves our facility, you will receive an \"Order Shipped\" email with your tracking number embedded in the body of the email."},
        {idx: 6, question: "Do I receive an invoice for my order?", answer: "As soon as you submit your order, you should receive a confirmation email from us. You should also receive a follow up with shipping and tracking information as soon as your order is processed."},
        {idx: 7, question: "WHAT IF THERE'S A MISTAKE WITH MY ORDER?", answer: "Well, crap. That's on us. We work hard to make things great, but we do make mistakes from time to time. Just send an email to customers@.com and we will make it right."}
    ]

    return FAQs;
}


// returns Our Story section info
const getOurStory = () => {
    const ourStory = [
            {imagePath: "../images/holder.jpg", leftImage: true, smallHeader: "where we've been", bigHeader: "our history", sectionText: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptate esse, quam, eveniet perferendis repellendus sint voluptatibus, a sunt saepe dolorum fugiat odit quia cupiditate ab dicta! Nobis debitis provident consequatur hic! Maxime sed rerum, saepe blanditiis eaque et facere dignissimos doloremque perferendis voluptate fugiat in tempora cumque animi. Nam iste quia excepturi? Explicabo animi rerum nisi fugit rem aperiam officiis."},
            {imagePath: "../images/holder.jpg", leftImage: false, smallHeader: "what we are about", bigHeader: "serious play", sectionText: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptate esse, quam, eveniet perferendis repellendus sint voluptatibus, a sunt saepe dolorum fugiat odit quia cupiditate ab dicta! Nobis debitis provident consequatur hic! Maxime sed rerum, saepe blanditiis eaque et facere dignissimos doloremque perferendis voluptate fugiat in tempora cumque animi. Nam iste quia excepturi? Explicabo animi rerum nisi fugit rem aperiam officiis."},
            {imagePath: "../images/holder.jpg", leftImage: true, smallHeader: "what we are doing", bigHeader: "our business", sectionText: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptate esse, quam, eveniet perferendis repellendus sint voluptatibus, a sunt saepe dolorum fugiat odit quia cupiditate ab dicta! Nobis debitis provident consequatur hic! Maxime sed rerum, saepe blanditiis eaque et facere dignissimos doloremque perferendis voluptate fugiat in tempora cumque animi. Nam iste quia excepturi? Explicabo animi rerum nisi fugit rem aperiam officiis."},
            {imagePath: "../images/holder.jpg", leftImage: false, smallHeader: "where we are going", bigHeader: "the future", sectionText: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptate esse, quam, eveniet perferendis repellendus sint voluptatibus, a sunt saepe dolorum fugiat odit quia cupiditate ab dicta! Nobis debitis provident consequatur hic! Maxime sed rerum, saepe blanditiis eaque et facere dignissimos doloremque perferendis voluptate fugiat in tempora cumque animi. Nam iste quia excepturi? Explicabo animi rerum nisi fugit rem aperiam officiis."}
    ]

    return ourStory;
}

// returns Our Story 3 card section info
const getOurStoryCardSection = () => {
    const ourStoryCardInfo = [
        {imagePath: "../images/holder.jpg", header: "our cafes", text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates doloremque dolore est enim officiis nisi magni aperiam quae deserunt vel voluptatum voluptate maiores nobis fuga, porro libero magnam quasi. Praesentium ipsam veniam placeat assumenda maxime doloremque explicabo nesciunt deleniti voluptatem asperiores, error voluptas iure debitis.", buttonText: "get directions", url: "/cafes"},
        {imagePath: "../images/holder.jpg", header: "our blog", text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates doloremque dolore est enim officiis nisi magni aperiam quae deserunt vel voluptatum voluptate maiores nobis fuga, porro libero magnam quasi. Praesentium ipsam veniam placeat assumenda maxime doloremque explicabo nesciunt deleniti voluptatem asperiores, error voluptas iure debitis.", buttonText: "read the blog", url: "/blog"},
        {imagePath: "../images/holder.jpg", header: "partner with us", text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates doloremque dolore est enim officiis nisi magni aperiam quae deserunt vel voluptatum voluptate maiores nobis fuga, porro libero magnam quasi. Praesentium ipsam veniam placeat assumenda maxime doloremque explicabo nesciunt deleniti voluptatem asperiores, error voluptas iure debitis.", buttonText: "contact us", url: "/wholesale2b"}
    ]

    return ourStoryCardInfo;
}

// returns brewing change sections
const getBrewingChangeSections = () => {
    const sections = [
        {   
            imagePath: "../images/holder_2.jpg",
            header: "SCHEDULING CLASSES WITH HUMANITIX", 
            projectSummary: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus, quia aut praesentium soluta reiciendis adipisci accusamus necessitatibus odio possimus, nesciunt quisquam itaque nisi excepturi minima maiores dolorem voluptate vero ea ipsam. Debitis, porro? Sequi fugit necessitatibus, minima culpa itaque ipsum.",
            impact: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi veniam nobis quas dicta iure at dolores minus earum fugit natus.",
            projectLeader: "Lorem ipsum dolor sit amet consectetur",
            projectTimeLine: "November 2022 - ongoing",
            buttons: [
                {text: "schedule a public class or tour", url: "/public-classes"},
                {text: "learn about humanitix", url: "https://www.humanitix.com/us/impact"}
            ]
        },
        {   
            imagePath: "../images/holder_2.jpg",
            header: "Lab Coffee Donations for Bay View Community Center Food Pantry", 
            projectSummary: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus, quia aut praesentium soluta reiciendis adipisci accusamus necessitatibus odio possimus, nesciunt quisquam itaque nisi excepturi minima maiores dolorem voluptate vero ea ipsam. Debitis, porro? Sequi fugit necessitatibus, minima culpa itaque ipsum.",
            impact: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi veniam nobis quas dicta iure at dolores minus earum fugit natus.",
            projectLeader: "Lorem ipsum dolor sit amet consectetur",
            projectTimeLine: "February 9th, 2021 - Ongoing",
            buttons: [
                {text: "learn about bay view community center food pantry", url: "https://bayviewcenter.org/food-pantry/"}
            ]
        },
        {   
            imagePath: "../images/holder_2.jpg",
            header: "Community Fridge Milwaukee", 
            projectSummary: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus, quia aut praesentium soluta reiciendis adipisci accusamus necessitatibus odio possimus, nesciunt quisquam itaque nisi excepturi minima maiores dolorem voluptate vero ea ipsam. Debitis, porro? Sequi fugit necessitatibus, minima culpa itaque ipsum.",
            impact: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi veniam nobis quas dicta iure at dolores minus earum fugit natus.",
            projectLeader: "Lorem ipsum dolor sit amet consectetur",
            projectTimeLine: "October 19th, 2020 - Ongoing",
            buttons: [
                {text: "support community fridge milwaukee", url: "https://www.facebook.com/pages/category/Community-Organization/MKE-Community-Fridge-106248081188387/"}
            ]
        },
        {   
            imagePath: "../images/holder_2.jpg",
            header: "Great Cycle Challenge", 
            projectSummary: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus, quia aut praesentium soluta reiciendis adipisci accusamus necessitatibus odio possimus, nesciunt quisquam itaque nisi excepturi minima maiores dolorem voluptate vero ea ipsam. Debitis, porro? Sequi fugit necessitatibus, minima culpa itaque ipsum.",
            impact: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi veniam nobis quas dicta iure at dolores minus earum fugit natus.",
            projectLeader: "Lorem ipsum dolor sit amet consectetur",
            projectTimeLine: "September 2022",
            buttons: [
                {text: "sponsor the great cycle challenge", url: "https://greatcyclechallenge.com/"}
            ]
        },
        {   
            imagePath: "../images/holder_2.jpg",
            header: "Osito Coffee Colombian Farmer Fund", 
            projectSummary: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus, quia aut praesentium soluta reiciendis adipisci accusamus necessitatibus odio possimus, nesciunt quisquam itaque nisi excepturi minima maiores dolorem voluptate vero ea ipsam. Debitis, porro? Sequi fugit necessitatibus, minima culpa itaque ipsum.",
            impact: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi veniam nobis quas dicta iure at dolores minus earum fugit natus.",
            projectLeader: "Lorem ipsum dolor sit amet consectetur",
            projectTimeLine: "June 25th, 2021",
            buttons: [
                {text: "learn about osito coffee colombian farmer fund", url: "https://www.gofundme.com/f/osito-farmer-fund?mc_cid=a69dd7fa59&mc_eid=a8925e3c0e"}
            ]
        },
        {   
            imagePath: "../images/holder_2.jpg",
            header: "WE LOVE TEACHERS BLEND", 
            projectSummary: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus, quia aut praesentium soluta reiciendis adipisci accusamus necessitatibus odio possimus, nesciunt quisquam itaque nisi excepturi minima maiores dolorem voluptate vero ea ipsam. Debitis, porro? Sequi fugit necessitatibus, minima culpa itaque ipsum.",
            impact: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi veniam nobis quas dicta iure at dolores minus earum fugit natus.",
            projectLeader: "Lorem ipsum dolor sit amet consectetur",
            projectTimeLine: "November 2022 - ongoing",
            buttons: [
                {text: "shop we love teachers", url: "/product/we-love-teachers-blend-2-half-pound-bags"},
                {text: "learn about city forward collective", url: "https://www.cityforwardcollective.org/teachers"}
            ]
        }
    ]

    return sections;
}


export {
    slugify,
    getDropDownForShop,
    getDropDownForCafes,
    getDropDownForLearning,
    getDropDownForAboutUs,
    openURLInNewWindow,
    getTopNavbarLinks,
    getHighlighSectionInfo,
    getFAQs,
    getOurStory,
    getOurStoryCardSection,
    getBrewingChangeSections
};