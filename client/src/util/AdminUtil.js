import LightbulbOutlinedIcon from '@mui/icons-material/LightbulbOutlined';
import FreeBreakfastOutlinedIcon from '@mui/icons-material/FreeBreakfastOutlined';
import RssFeedOutlinedIcon from '@mui/icons-material/RssFeedOutlined';
import LooksOutlinedIcon from '@mui/icons-material/LooksOutlined';
import HandymanOutlinedIcon from '@mui/icons-material/HandymanOutlined';
import WhatshotOutlinedIcon from '@mui/icons-material/WhatshotOutlined';


// returns string as lowercase with all spaces replaced with a '-'
const slugify = (toClean) => {
    // remove any '-' string might have to prevent duplicate dashes being added
    toClean = toClean.replaceAll("-", " ");
    // now can add dashes
    return toClean.toLowerCase().replace(/\s+/g, " ").replace(/\s/g, "-");
}


// returns array for the 'Shop' option in the navbar
const getDropDownForShop = () => {
    const shopOptions = [
        {name: "Coffee", url: "/product-category/roast/"},
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
                text: "Laborum animi quia culpa labore soluta ut laudantium accusantium perferendis. Blanditiis necessitatibus totam repellendus aspernatur minima fugiat laudantium adipisci quae non suscipit",
                isLink: true,
                url: "/public-classes",
                buttonText: "check out our classes"
            },
            {
                icon : <FreeBreakfastOutlinedIcon fontSize="large" />,
                heading: "Brewing Guides",
                text: "Labore soluta ut laudantium accusantium perferendis. Blanditiis necessitatibus totam repellendus aspernatur minima fugiat laudantium adipisci quae non suscipit",
                isLink: true,
                url: "/brewing-guides",
                buttonText: "brew better"
            },
            {
                icon : <RssFeedOutlinedIcon fontSize="large" />,
                heading: "Little Creek Coffee Blog",
                text: "Blanditiis necessitatibus totam repellendus aspernatur minima fugiat laudantium adipisci quae non suscipit laudantium adipisci quae non suscipit",
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
                text: "Amet consectetur adipisicing elit. Blanditiis quidem ducimus ut dolorem, a, magni nihil vel velit quasi at voluptatem assumenda aperiam commodi nobis nisi, natus excepturi explicabo. Beatae impedit vero itaque temporibus fuga",
                isLink: false,
                url: "/category/farm-to-cup",
                buttonText: "read our blog"
            },
            {
                icon : <HandymanOutlinedIcon fontSize="large" />,
                heading: "Fix My Equipment",
                text: "Amet consectetur adipisicing elit. Blanditiis quidem ducimus ut dolorem, a, magni nihil vel velit quasi at voluptatem assumenda aperiam commodi nobis nisi, natus excepturi explicabo. Beatae impedit vero itaque temporibus fuga",
                isLink: false,
                url: "/contact",
                buttonText: "get in touch with us"
            },
            {
                icon : <WhatshotOutlinedIcon fontSize="large" />,
                heading: "Learn About Our Roast Levels",
                text: "Amet consectetur adipisicing elit. Blanditiis quidem ducimus ut dolorem, a, magni nihil vel velit quasi at voluptatem assumenda aperiam commodi nobis nisi, natus excepturi explicabo. Beatae impedit vero itaque temporibus fuga",
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
        {idx: 0, question: "What are the delivery charges for orders from the Online Shop?", answer: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Vero, sit nobis blanditiis quia consequatur distinctio autem eveniet vel?"},
        {idx: 1, question: "Which payment methods are accepted in the Online Shop?", answer: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Vero, sit nobis blanditiis quia consequatur distinctio autem eveniet vel?"},
        {idx: 2, question: "How long will delivery take?", answer: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Vero, sit nobis blanditiis quia consequatur distinctio autem eveniet vel?" },
        {idx: 3, question: "How secure is shopping in the Online Shop? Is my data protected?", answer: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Vero, sit nobis blanditiis quia consequatur distinctio autem eveniet vel?"},
        {idx: 4, question: "What exactly happens after ordering?", answer: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Vero, sit nobis blanditiis quia consequatur distinctio autem eveniet vel?"},
        {idx: 5, question: "WILL I RECEIVE TRACKING INFORMATION?", answer: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Vero, sit nobis blanditiis quia consequatur distinctio autem eveniet vel?"},
        {idx: 6, question: "Do I receive an invoice for my order?", answer: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Vero, sit nobis blanditiis quia consequatur distinctio autem eveniet vel?"},
        {idx: 7, question: "WHAT IF THERE'S A MISTAKE WITH MY ORDER?", answer: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Vero, sit nobis blanditiis quia consequatur distinctio autem eveniet vel?"}
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

// returns modal section for Inside Little Creek commitments section
const getCompanyCommitments = () => {
    const sections = [
        {
            header: 'serving our community',
            paragraphs: [
                {variant: "p", paragraph: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam obcaecati illum minus similique totam alias iste, sunt maxime, corporis non, incidunt dolores!"},
                {variant: "p", paragraph: "Lorem ipsum dolor sit amet consectetur adipisicing elit. In ipsa laboriosam soluta minima ratione labore, qui atque quasi temporibus nemo ea placeat voluptas quos laudantium deleniti at est accusamus amet a optio similique! Fuga, natus ex. Corrupti voluptas quod consequatur commodi tenetur mollitia porro, praesentium hic et est perferendis eos quaerat sint eum necessitatibus molestiae qui molestias saepe minima ad sequi cupiditate voluptatibus. Doloribus, culpa perspiciatis nobis temporibus aliquam consequuntur dolor rerum minus quis tenetur."},
                {variant: "p", paragraph: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione placeat nostrum doloribus, quas similique nulla?"},
                {variant: "h6", header: "serving local customers"},
                {variant: "p", paragraph: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint modi tenetur iure et non quidem a odio sequi autem voluptatibus sapiente, libero est itaque vitae, unde delectus fugit mollitia!\n Error maiores - minus recusandae possimus repudiandae illo dicta temporibus ullam voluptatum"},
                {variant: "p", paragraph: "Ted Jenkins, Mr Manager"}
            ]
        },
        {
            header: 'environmental commitment',
            paragraphs: [
                {variant: "p", paragraph: "Temporibus, aspernatur expedita! Saepe quasi, natus explicabo laborum temporibus quia corporis neque provident eaque quis necessitatibus aliquam quae voluptas, rem at dolorem non ex omnis amet modi iusto voluptatum odio repellendus. Earum, nemo doloribus."},
                {variant: "p", paragraph: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sed perferendis ab eveniet accusantium fuga laudantium itaque est nostrum libero veritatis, placeat ut quisquam deserunt error culpa laboriosam assumenda iste quidem eaque deleniti, iusto vitae amet rerum mollitia. Quo et ullam molestiae at laborum. Delectus odio ea doloribus maiores facere in mollitia fugit quidem commodi, nesciunt rerum vitae totam laborum exercitationem nihil! Magnam, tempora commodi? Ipsa non quaerat similique ad accusamus!"},
                {variant: "p", paragraph: "Ted Jenkins, Mr Manager"}
            ]
        },
        {
            header: 'suppliers & accountability',
            paragraphs: [
                {variant: "p", paragraph: "s."},
                {variant: "p", paragraph: "Losamus!"},
                {variant: "p", paragraph: "Ted Jenkins, Mr Manager"}
            ]
        },
        {
            header: 'impact report',
            paragraphs: [
                {variant: "p", paragraph: "oluptatum odio repellendus. Earum, nemo doloribus."},
                {variant: "p", paragraph: "Loommodi, nesciunt rerum vitae e ad accusamus!"},
                {variant: "p", paragraph: "Ted Jenkins, Mr Manager"}
            ]
        }
    ]

    return sections;
}


const getServingOurCommunity = () => {
    const paragraphs =  [
        {idx: 0, variant: "p", text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam obcaecati illum minus similique totam alias iste, sunt maxime, corporis non, incidunt dolores!"},
        {idx: 1, variant: "p", text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. In ipsa laboriosam soluta minima ratione labore, qui atque quasi temporibus nemo ea placeat voluptas quos laudantium deleniti at est accusamus amet a optio similique! Fuga, natus ex. Corrupti voluptas quod consequatur commodi tenetur mollitia porro, praesentium hic et est perferendis eos quaerat sint eum necessitatibus molestiae qui molestias saepe minima ad sequi cupiditate voluptatibus. Doloribus, culpa perspiciatis nobis temporibus aliquam consequuntur dolor rerum minus quis tenetur."},
        {idx: 2, variant: "p", text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione placeat nostrum doloribus, quas similique nulla?"},
        {idx: 3, variant: "h6", text: "serving local customers"},
        {idx: 4, variant: "p", text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint modi tenetur iure et non quidem a odio sequi autem voluptatibus sapiente, libero est itaque vitae, unde delectus fugit mollitia!\n Error maiores - minus recusandae possimus repudiandae illo dicta temporibus ullam voluptatum"},
        {idx: 5, variant: "p", text: "Ted Jenkins, Mr Manager"}
    ]

    return paragraphs;
}

const getEnvironmentalCommitments = () => {
    const paragraphs = [
        {variant: "p", text: "Temporibus, aspernatur expedita! Saepe quasi, natus explicabo laborum temporibus quia corporis neque provident eaque quis necessitatibus aliquam quae voluptas, rem at dolorem non ex omnis amet modi iusto voluptatum odio repellendus. Earum, nemo doloribus."},
        {variant: "p", text: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sed perferendis ab eveniet accusantium fuga laudantium itaque est nostrum libero veritatis, placeat ut quisquam deserunt error culpa laboriosam assumenda iste quidem eaque deleniti, iusto vitae amet rerum mollitia. Quo et ullam molestiae at laborum. Delectus odio ea doloribus maiores facere in mollitia fugit quidem commodi, nesciunt rerum vitae totam laborum exercitationem nihil! Magnam, tempora commodi? Ipsa non quaerat similique ad accusamus!"},
        {variant: "p", text: "Ted Jenkins, Mr Manager"}
    ]

    return paragraphs;
}

// returns founder owners info for Abouts Us/Inside Little Creek
const getFoundingOwners = () => {
    const info = {
        header: 'founding owners',
        text: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Autem molestiae quidem voluptas dolorem esse, ratione quam odio ipsam! Dolorum perspiciatis maiores id molestiae quas libero quam quidem. Ipsam debitis, vel ipsa, autem perferendis nobis expedita quo, modi voluptatum in quae labore odio suscipitquos non maiores saepe quod cum? Enim nobis officiis libero? Odio esse saepe quia.',
        owners: [
            {name: 'Ted Kemper', title: 'mangaging director and founder', imagePath: '../images/holder_4.jpg', socialMediaLink: 'https://twitter.com/?lang=en'},
            {name: 'Lisa Maker', title: 'co-owner', imagePath: '../images/holder_4.jpg'},
        ]
    }

    return info;
}

// returns employee owners info for Abouts Us/Inside Little Creek
const getEmployeeOwners = () => {
    const info = {
        header: 'employee owners',
        text: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Autem molestiae quidem voluptas dolorem esse, ratione quam odio ipsam! Dolorum perspiciatis maiores id molestiae quas libero quam quidem. Ipsam debitis, vel ipsa, autem perferendis nobis expedita quo, modi voluptatum in quae labore odio.',
        owners: [
            {name: 'Clayton Owen', title: 'director of development', imagePath: '../images/holder_4.jpg', socialMediaLink: 'https://twitter.com/?lang=en'},
            {name: 'Maja Valdez', title: 'director of production', imagePath: '../images/holder_4.jpg', socialMediaLink: 'https://twitter.com/?lang=en'},
            {name: 'Barry Tran', title: 'director of products', imagePath: '../images/holder_4.jpg', socialMediaLink: 'https://twitter.com/?lang=en'},
            {name: 'Barbara Rivas', title: 'director of customer care', imagePath: '../images/holder_4.jpg', socialMediaLink: 'https://twitter.com/?lang=en'},
            {name: 'Kye Winter', title: 'director of finance', imagePath: '../images/holder_4.jpg', socialMediaLink: 'https://twitter.com/?lang=en'},
            {name: 'Lloyd Chambers', title: 'director of retail', imagePath: '../images/holder_4.jpg', socialMediaLink: 'https://twitter.com/?lang=en'},
        ]
    }

    return info;
}

// returns coffee geeks info for About Us/Inside LittleCreek
const getCoffeeGeeks = () => {
    const geeks = [
            {name: 'Victoria Avila', title: 'director of coffee', imagePath: '../images/holder_4.jpg', socialMediaLink: 'https://twitter.com/?lang=en'},
            {name: 'Virgil Mitchell', title: 'director of bakery', imagePath: '../images/holder_4.jpg', socialMediaLink: 'https://twitter.com/?lang=en'},
            {name: 'Jenson Mcbride', title: 'lean production roaster', imagePath: '../images/holder_4.jpg', socialMediaLink: 'https://twitter.com/?lang=en'},
            {name: 'Zain Kerr', title: 'accounting staff', imagePath: '../images/holder_4.jpg', socialMediaLink: 'https://twitter.com/?lang=en'},
            {name: 'Helen Leonard', title: 'accounting assistant', imagePath: '../images/holder_4.jpg', socialMediaLink: 'https://twitter.com/?lang=en'},
            {name: 'Alan Bradford', title: 'master coach', imagePath: '../images/holder_4.jpg', socialMediaLink: 'https://twitter.com/?lang=en'},
            {name: 'Arran Lawson', title: 'customer care', imagePath: '../images/holder_4.jpg', socialMediaLink: 'https://twitter.com/?lang=en'},
            {name: 'Florence Welch', title: 'employee care', imagePath: '../images/holder_4.jpg', socialMediaLink: 'https://twitter.com/?lang=en'},
            {name: 'Lance Brandt', title: 'designer', imagePath: '../images/holder_4.jpg', socialMediaLink: 'https://twitter.com/?lang=en'},
            {name: 'Humza Valentine', title: 'account manager', imagePath: '../images/holder_4.jpg', socialMediaLink: 'https://twitter.com/?lang=en'},
            {name: 'Kyra Copeland', title: 'design direrctor', imagePath: '../images/holder_4.jpg', socialMediaLink: 'https://twitter.com/?lang=en'},
            {name: 'Zane Deleon', title: 'director of kitchen', imagePath: '../images/holder_4.jpg', socialMediaLink: 'https://twitter.com/?lang=en'},
            {name: 'Lorna Cochran', title: 'plumber', imagePath: '../images/holder_4.jpg', socialMediaLink: 'https://twitter.com/?lang=en'},
            {name: 'Kelvin Cabrera', title: 'master coach', imagePath: '../images/holder_4.jpg', socialMediaLink: 'https://twitter.com/?lang=en'},
            {name: 'Lacie Wright', title: 'designer', imagePath: '../images/holder_4.jpg', socialMediaLink: 'https://twitter.com/?lang=en'},
            {name: 'Saif Hanna', title: 'director of retail', imagePath: '../images/holder_4.jpg', socialMediaLink: 'https://twitter.com/?lang=en'},
        ]

    return geeks;
}

// returns core commitments for About Us/Inside LittleCreek
const getCoreCommitments = () => {
    const commitments = [
        {title: "keep your commitments", text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores ad eaque quo quod eum eveniet? Nulla nemo aspernatur illum natus sunt reprehenderit odit consequuntur vel voluptas nesciunt quis, tempore alias sint, doloremque blanditiis adipisci voluptatum quaerat recusandae id. Perferendis."},
        {title: "think hard", text: "Nulla nemo aspernatur illum natus sunt reprehenderit odit consequuntur vel voluptas nesciunt quis, tempore alias sint, doloremque blanditiis adipisci voluptatum quaerat recusandae id. Perferendis."},
        {title: "clean the corners", text: "Maiores ad eaque quo quod eum eveniet? Nulla nemo aspernatur illum natus sunt reprehenderit odit consequuntur vel voluptas nesciunt quis, tempore alias sint, doloremque blanditiis adipisci voluptatum quaerat recusandae id. Perferendis."},
        {title: "create remarkable care", text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores ad eaque quo quod eum eveniet? Nulla nemo aspernatur illum natus sunt reprehenderit odit consequuntur vel voluptas nesciunt quis, tempore alias sint, doloremque blanditiis adipisci voluptatum quaerat recusandae id"},
        {title: "take care of co-workers", text: "Amet consectetur adipisicing elit. Maiores ad eaque quo quod eum eveniet? Nulla nemo aspernatur illum natus sunt reprehenderit odit consequuntur vel voluptas nesciunt quis, tempore alias sint, doloremque blanditiis adipisci voluptatum quaerat recusandae id. Perferendis."},
        {title: "be here, physically & mentally", text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores ad eaque quo quod eum eveniet? illum natus sunt reprehenderit odit consequuntur vel voluptas nesciunt quis, tempore alias sint, doloremque blanditiis adipisci voluptatum quaerat recusandae id. Perferendis."},
        {title: "prepare for your work", text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores ad eaque quo quod eum eveniet? Nulla nemo aspernatur illum natus sunt reprehenderit odit consequuntur vel voluptas nesciunt quis, tempore alias sint, doloremque blanditiis adipisci voluptatum."},
        {title: "speak up", text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores ad eaque quo quod eum eveniet? Nulla nemo aspernatur illum natus sunt reprehenderit odit consequuntur vel voluptas nesciunt quis, tempore alias sint, doloremque blanditiis adipisci voluptatum quaerat recusandae id. Perferendis."},
        {title: "look to the furture, not the past", text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla nemo aspernatur illum natus sunt reprehenderit odit consequuntur vel voluptas nesciunt quis, tempore alias sint, doloremque blanditiis adipisci voluptatum quaerat recusandae id. Perferendis."},
        {title: "be a hero, find a hero", text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores ad eaque quo quod eum eveniet? Nulla nemo aspernatur illum natus sunt reprehenderit odit consequuntur vel voluptas nesciunt quis, tempore alias sint, doloremque blanditiis adipisci voluptatum quaerat recusandae id. Perferendis."},
        {title: "take risks", text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores ad eaque quo quod eum eveniet? Nulla nemo aspernatur illum natus sunt reprehenderit odit consequuntur vel voluptas nesciunt quis, tempore alias sint, doloremque blanditiis adipisci voluptatum quaerat recusandae id. Perferendis."},
        {title: "be urgent to the customer", text: "Lorem ipsum dolor sit amet consectetur adipisicing elit Nulla nemo aspernatur illum natus sunt reprehenderit odit consequuntur vel voluptas nesciunt quis, tempore alias sint, doloremque blanditiis adipisci voluptatum quaerat recusandae id. Perferendis."},
        {title: "never stop learning", text: " Nulla nemo aspernatur illum natus sunt reprehenderit odit consequuntur vel voluptas nesciunt quis, tempore alias sint, doloremque blanditiis adipisci voluptatum quaerat recusandae id. Perferendis."}
    ]

    return commitments;
}

// returns states for dropdown in user accounts
const getStates = () => {
    const states = [
        "Alabama",
        "Alaska",
        "Arizona",
        "Arkansas",
        "California",
        "Colorado",
        "Connecticut",
        "Delaware",
        "Florida",
        "Georgia",
        "Hawaii",
        "Idaho",
        "Illinois",
        "Indiana",
        "Iowa",
        "Kansas",
        "Kentucky",
        "Louisiana",
        "Maine",
        "Maryland",
        "Massachusetts",
        "Michigan",
        "Minnesota",
        "Mississippi",
        "Missouri",
        "Montana",
        "Nebraska",
        "Nevada",
        "New Hampshire",
        "New Jersey",
        "New Mexico",
        "NewYork",
        "North Carolina",
        "North Dakota",
        "Ohio",
        "Oklahoma",
        "Oregon",
        "Pennsylvania",
        "Rhode Island",
        "South Carolina",
        "South Dakota",
        "Tennessee",
        "Texas",
        "Utah",
        "Vermont",
        "Virginia",
        "Washington",
        "West Virginia",
        "Wisconsin",
        "Wyoming",
    ]

    return states;
}

const getStateAbbreviation = (state) => {

    switch (state) {
        case "Alabama": return "AL";
        case "Alaska": return "AK";
        case "Arizona": return "AZ";
        case "Arkansas": return "AR";
        case "California": return "CA";
        case "Colorado": return "CO";
        case "Connecticut": return "CT";
        case "Delaware": return "DE";
        case "Florida": return "FL";
        case "Georgia": return "GA";
        case "Hawaii": return "HI";
        case "Idaho": return "ID";
        case "Illinois": return "IL";
        case "Indiana": return "IN";
        case "Iowa": return "IA";
        case "Kansas": return "KS";
        case "Kentucky": return "KY";
        case "Louisiana": return "LA";
        case "Maine": return "ME";
        case "Maryland": return "MD";
        case "Massachusetts": return "MA";
        case "Michigan": return "MI";
        case "Minnesota": return "MN";
        case "Mississippi": return "MS";
        case "Missouri": return "MO";
        case "Montana": return "MT";
        case "Nebraska": return "NE";
        case "Nevada": return "NV";
        case "New Hampshire": return "NH";
        case "New Jersey": return "NJ";
        case "New Mexico": return "NM";
        case "New York": return "NY";
        case "North Carolina": return "NC";
        case "North Dakota": return "ND";
        case "Ohio": return "OH";
        case "Oklahoma": return "OK";
        case "Oregon": return "OR";
        case "Pennsylvania": return "PA";
        case "Rhode Island": return "PR";
        case "South Carolina": return "SC";
        case "South Dakota": return "SD";
        case "Tennessee": return "TN";
        case "Texas": return "TX";
        case "Utah": return "UT";
        case "Vermont": return "VT";
        case "Virginia": return "VI";
        case "Washington": return "WA";
        case "West Virginia": return "WV";
        case "Wisconsin": return "WI";
        case "Wyoming": return "WY";
        default: return "WI";
    }
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
    getBrewingChangeSections,
    getCompanyCommitments,
    getServingOurCommunity,
    getEnvironmentalCommitments,
    getFoundingOwners,
    getEmployeeOwners,
    getCoffeeGeeks,
    getCoreCommitments,
    getStates,
    getStateAbbreviation
};