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
        {name: "Coffee", url: "/product-category/coffee"},
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
                text: "Sign up for one of our public classes and learn hands-on how to pull a shot, create latte art, or simply brew your coffee like an actual Stone Creek barista!",
                isLink: true,
                url: "/public-classes",
                buttonText: "check out our classes"
            },
            {
                icon : <FreeBreakfastOutlinedIcon fontSize="large" />,
                heading: "Brewing Guides",
                text: "Do you need tips on how to use your Aeropress or V60? Then check out one of our manual brewing guides so that you can brew a great cup of Stone Creek Coffee at home.",
                isLink: true,
                url: "/brewing-guides",
                buttonText: "brew better"
            },
            {
                icon : <RssFeedOutlinedIcon fontSize="large" />,
                heading: "Stone Creek Coffee Blog",
                text: "Get the inside scoop of how Stone Creek Coffee operates. Just click over to our blog to learn about new coffees, new endeavors, and more.",
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

export {
    slugify,
    getDropDownForShop,
    getDropDownForCafes,
    getDropDownForLearning,
    getDropDownForAboutUs,
    openURLInNewWindow,
    getTopNavbarLinks,
    getHighlighSectionInfo
};