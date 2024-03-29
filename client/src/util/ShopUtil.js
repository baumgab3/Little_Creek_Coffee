
const getRoastOptions = () => {
    const roasts = {
        category: "roast",
        toggleFunction: 'handleToggleRoasts',
        toggleBoolean: 'toggleRoasts',
        openAllFunction: 'handleOpenRoasts',
        subCategories: [
            {name: "Light", url: "/product-category/roast/light/"},
            {name: "Medium", url: "/product-category/roast/medium/"},
            {name: "Dark", url: "/product-category/roast/dark/"},
            {name: "Decaf", url: "/product-category/roast/decaf/"},
        ]
    }

    return roasts;
}

const getShopCategories = () => {
    const categories = [
        {
            category: "roast",
            toggleFunction: 'handleToggleRoasts',
            toggleBoolean: 'toggleRoasts',
            openAllFunction: 'handleOpenRoasts',
            categoryUrl: "/product-category/roast/",
            subCategories: [
                {name: "Light", url: "/product-category/roast/light/"},
                {name: "Medium", url: "/product-category/roast/medium/"},
                {name: "Dark", url: "/product-category/roast/dark/"},
                {name: "Decaf", url: "/product-category/roast/decaf/"},
            ]
        },
        {
            category: "region",
            toggleFunction: 'handleToggleRegions',
            toggleBoolean: 'toggleRegions',
            openAllFunction: 'handleOpenRegions',
            categoryUrl: "/product-category/region/",
            subCategories: [
                {name: "Africa", url: "/product-category/region/africa/"},
                {name: "Central America", url: "/product-category/region/central-america/"},
                {name: "South America", url: "/product-category/region/south-america/"},
                {name: "Compositions", url: "/product-category/region/compositions/"},
            ]
        },
        // {
        //     category: "buy in bulk",
        //     toggleFunction: 'handleToggleBulk',
        //     toggleBoolean: 'toggleBulk',
        //     openAllFunction: 'handleOpenBulk',
        //     categoryUrl: "/product-category/buy-in-bulk/",
        //     subCategories: [
        //         {name: "Light Roast", url: "/product-category/buy-in-bulk/bulk-light/"},
        //         {name: "Medium Roast", url: "/product-category/buy-in-bulk/bulk-medium/"},
        //         {name: "Dark Roast", url: "/product-category/buy-in-bulk/bulk-dark/"},
        //     ]
        // },
        // {
        //     category: "subscriptions",
        //     toggleFunction: 'handleToggleSubscriptions',
        //     toggleBoolean: 'toggleSubscription',
        //     openAllFunction: 'handleOpenSubscriptions',
        //     categoryUrl: "/product-category/subscriptions/",
        //     subCategories: [
        //         {name: "coffee", url: "/product-category/subscriptions/coffee/"}
        //     ]
        // },
        {
            category: "merchandise",
            toggleFunction: 'handleToggleMerchandise',
            toggleBoolean: 'toggleMerchandise',
            openAllFunction: 'handleOpenMerchandise',
            categoryUrl: "/product-category/merchandise/",
            subCategories: [
                {name: "Brewing Tools", url: "/product-category/merchandise/brewing-tools/"},
                {name: "Clothing", url: "/product-category/merchandise/clothing/"},
                {name: "Drinkware", url: "/product-category/merchandise/drinkware/"},
                {name: "Other Merch", url: "/product-category/merchandise/other-merch/"},
                // {name: "Posters & Prints", url: "/product-category/merchandise/posters-and-print/"},
            ]
        },
        {
            category: "cold brew",
            toggleFunction: "",
            toggleBoolean: "",
            openAllFunction: "",
            categoryUrl: "/product-category/cold-brew/",
        },
        {
            category: "tea",
            toggleFunction: "",
            toggleBoolean: "",
            openAllFunction: "",
            categoryUrl: "/product-category/tea/",
        },
    ]

    return categories;
}

const getGrindTypes = () => {
    const types = [
        {id: 0, type: "#0 - Whole Bean"},
        {id: 1, type: "#1 - Espresso"},
        {id: 8, type: "#8 - Aeropress of Keurig"},
        {id: 14, type: "#14 - Cone Filter"},
        {id: 17, type: "#17 - Flat Fliter or Cold Brew"},
        {id: 18, type: "#18 - Chemex or Kalita"},
        {id: 20, type: "#20 - French Press of Clever"}
    ]

    return types;
}


const isSafeEval = (toEval) => {
    switch (toEval) {
        case "handleToggleRegions": return true;
        case "toggleRegions": return true;
        case "handleOpenRegions": return true;
        case "handleToggleMerchandise": return true;
        case "toggleMerchandise": return true;
        case "handleOpenMerchandise": return true;
        default:
            return false;
    }
}

export {
    getRoastOptions,
    getShopCategories,
    getGrindTypes,
    isSafeEval
}