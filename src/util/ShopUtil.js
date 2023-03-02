
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
        {
            category: "buy in bulk",
            toggleFunction: 'handleToggleBulk',
            toggleBoolean: 'toggleBulk',
            openAllFunction: 'handleOpenBulk',
            categoryUrl: "/product-category/buy-in-bulk/",
            subCategories: [
                {name: "Light Roast", url: "/product-category/buy-in-bulk/bulk-light/"},
                {name: "Medium Roast", url: "/product-category/buy-in-bulk/bulk-medium/"},
                {name: "Dark Roast", url: "/product-category/buy-in-bulk/bulk-dark/"},
            ]
        },
        {
            category: "subscriptions",
            toggleFunction: 'handleToggleSubscriptions',
            toggleBoolean: 'toggleSubscription',
            openAllFunction: 'handleOpenSubscriptions',
            categoryUrl: "/product-category/subscriptions/",
            subCategories: [
                {name: "coffee", url: "/product-category/subscriptions/coffee/"}
            ]
        },
        {
            category: "cold brew",
            toggleFunction: "",
            toggleBoolean: "",
            openAllFunction: "",
            categoryUrl: "/product-category/cold-brew/",
        },
    ]

    return categories;
}

export {
    getRoastOptions,
    getShopCategories
}