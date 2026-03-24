export const homePageQuery = `*[_type == "homePage"][0]`;

export const announcementsQuery = `*[_type == "announcement"] | order(order asc)`;

export const faqQuery = `*[_type == "faqItem"] | order(order asc)`;

export const coreValuesQuery = `*[_type == "coreValue"] | order(order asc)`;

export const liturgicalStationsQuery = `*[_type == "liturgicalStation"] | order(order asc)`;

export const visitPageQuery = `*[_type == "visitPage"][0]`;

export const doctrinePageQuery = `*[_type == "doctrinePage"][0]`;

export const ministryPageQuery = `*[_type == "ministryPage" && slug.current == $slug][0]`;
