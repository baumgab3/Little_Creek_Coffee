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

export {
    slugify,
    getDropDownForShop,
    getDropDownForCafes,
    getDropDownForLearning,
    getDropDownForAboutUs,
    openURLInNewWindow
};