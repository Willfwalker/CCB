export const MINISTRIES = {
  "Life Together": [
    "Men's Ministry",
    "Women's Ministry",
    "Discipleship Groups",
    "Home Fellowships",
  ],
  "Next Generation": [
    "Children's Ministry",
    "Youth Ministry",
    "Trinity Classical School",
  ],
  "Mission & Service": [
    "Missionaries",
    "Christ Church Press",
    "Hospitality Ministry",
  ],
};

export const MINISTRY_LINKS: Record<string, string> = {
  "Men's Ministry": "/ccbmen",
  "Women's Ministry": "/ccbwomen",
  "Discipleship Groups": "/discipleship-groups",
  "Home Fellowships": "/home-fellowships",
  "Children's Ministry": "/childrens-ministry",
  "Youth Ministry": "/youth",
  "Trinity Classical School": "https://www.trinitybham.org",
  "Missionaries": "/missions-blog",
  "Christ Church Press": "https://www.christchurchpress.com",
  "Hospitality Ministry": "/hospitality-ministry-1",
};

export function getNavHref(label: string): string {
  switch (label) {
    case "Doctrine": return "/doctrine";
    case "Visit Us": return "/visit";
    case "Media": return "/media";
    default: return `/#${label.toLowerCase().replace(/\s+/g, "-")}`;
  }
}
