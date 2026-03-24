import { createClient } from "@sanity/client";
import { createReadStream } from "fs";
import path from "path";

const client = createClient({
  projectId: "ir46yjzt",
  dataset: "production",
  apiVersion: "2024-01-01",
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});

async function uploadImage(filePath) {
  const filename = path.basename(filePath);
  console.log(`  Uploading ${filename}...`);
  const asset = await client.assets.upload("image", createReadStream(filePath), {
    filename,
  });
  return {
    _type: "image",
    asset: { _type: "reference", _ref: asset._id },
  };
}

async function seed() {
  console.log("Seeding Sanity database...\n");

  // ─── Upload images ───
  console.log("Uploading images...");
  const heroImage = await uploadImage("public/church_building.png");
  const familyImage = await uploadImage("public/Happy_People.png");
  const visitSidebarImage = await uploadImage("public/dad_teaching.png");
  const mensHero = await uploadImage("public/mens_ministry_hero.png");
  const womensHero = await uploadImage("public/womens_ministry_hero.png");
  const youthHero = await uploadImage("public/youth-hero.png");
  const childrensHero = await uploadImage("public/childrens-hero.png");
  const discipleshipHero = await uploadImage("public/discipleship_hero.png");
  const homeFellowshipsHero = await uploadImage("public/home_fellowships_hero.png");
  const missionsHero = await uploadImage("public/missionaries_hero.png");
  const hospitalityHero = await uploadImage("public/hospitality_hero.png");
  console.log("  Done.\n");

  // ─── Home Page (singleton) ───
  console.log("Creating Home Page...");
  await client.createOrReplace({
    _id: "homePage",
    _type: "homePage",
    heroImage,
    heroScriptureRef: "John 6:37",
    heroScriptureText:
      "\u201cAll that the Father gives me will come to me, and whoever comes to me I will never cast out.\u201d",
    familyQuote:
      "God designed the family as the first institution, the first church, and the first school. Everything we do here is aimed at strengthening that design.",
    familyImage,
    familyTitle: "Family",
    familyBody:
      "Before there was a church, before there was a nation, God made a family. The family is not a cultural convention \u2014 it is a divine institution, the first and most fundamental building block of human civilization.\n\nAt Christ Church, we believe the household \u2014 not the individual \u2014 is the basic unit of the church. Parents are the primary disciplers of their children. The wider church family exists to surround, support, and strengthen these households in their God-given calling.",
    youtubeVideoUrl: "https://www.youtube.com/embed/BBEQdFyD_SY",
  });
  console.log("  Done.\n");

  // ─── Announcements ───
  console.log("Creating Announcements...");
  const announcements = [
    {
      date: "Mar 7",
      title: "Women\u2019s Spring Brunch",
      description:
        "Mark your calendars for our annual brunch, happening Saturday, March 7th, from 9\u201311:30 am. Ladies in high school are encouraged to attend as well! The theme is spiritual friendship, with a focus on the \u201cone another\u201d commands of Scripture.",
      rsvpLink: "https://bit.ly/WomensBrunch26CCB",
      order: 1,
    },
    {
      date: "Mar 8",
      title: "Twentysomethings Supper",
      description:
        "Pastor Nate is hosting another monthly get-together for twentysomethings\u2014single, married, kids, no kids, doesn\u2019t matter. Bring friends! A casual time of sharing a meal, hanging out, and discussing theology. March 8th from 3\u20136 pm.",
      rsvpLink: "https://bit.ly/TSSMarch2026",
      order: 2,
    },
    {
      date: "Mar 14",
      title: "Peacemaking Mini-Conference",
      description:
        "Join us Saturday, March 14, from 9 am\u201312:30 pm for an in-house conference on godly conflict resolution. Core principles and practical strategies for more peaceable relationships. Pastors Nate and Matt will each deliver a talk, followed by interactive sessions.",
      rsvpLink: "https://bit.ly/CCBpeacemaking",
      order: 3,
    },
    {
      date: "Mar 20",
      title: "TCS Benefit Gala",
      description:
        "You are invited to attend the upcoming gala for our church\u2019s school, Trinity Classical School. All funds raised will go toward the Tuition Assistance Fund.",
      rsvpLink: "https://bit.ly/TCSgala",
      order: 4,
    },
    {
      date: "Sundays thru Mar 29",
      title: "Membership Class",
      description:
        "An 8-week series of classes designed to prepare you for membership in our church. Six classes on core theological distinctives of the Reformed tradition, and two on distinctives of our church. Sundays from 1\u20132 pm in the Fellowship Hall.",
      rsvpLink: "https://bit.ly/CCBmembership26",
      order: 5,
    },
    {
      date: "May 15\u201317",
      title: "Men\u2019s Retreat",
      description:
        "Men, save the date for our upcoming retreat on the Camp Firwood grounds. More details soon to come.",
      order: 6,
    },
    {
      date: "Now thru June",
      title: "Home Fellowships",
      description:
        "We are continuing to facilitate gathering in each others\u2019 homes through Home Fellowships. A great way to get to know others in our church, especially if you are newer to the community.",
      rsvpLink: "https://bit.ly/HomeFellowships26",
      order: 7,
    },
  ];

  for (const a of announcements) {
    await client.create({ _type: "announcement", ...a });
  }
  console.log(`  Created ${announcements.length} announcements.\n`);

  // ─── FAQ Items ───
  console.log("Creating FAQ Items...");
  const faqItems = [
    {
      question: "What do we believe?",
      answer:
        "We hold to the historic Christian faith as summarized in the Apostles' and Nicene Creeds. We believe in the authority of Scripture, the sovereignty of God, and salvation by grace alone through faith alone in Christ alone.",
      order: 1,
    },
    {
      question: "What is our worship like?",
      answer:
        "Our worship is reverent and liturgical, centered on the preaching of God's Word, the singing of psalms and hymns, the prayers of the people, and the regular celebration of the Lord's Supper.",
      order: 2,
    },
    {
      question: "When do we meet?",
      answer:
        "We gather every Lord's Day at 10:00 AM for morning worship. We also have midweek fellowship and prayer meetings on Wednesday evenings at 7:00 PM.",
      order: 3,
    },
    {
      question: "How can I get involved?",
      answer:
        "The best way to get started is to join us on a Sunday morning. After the service, we'd love to meet you and help you find ways to connect \u2014 whether through a small group, serving, or one of our ministries.",
      order: 4,
    },
  ];

  for (const f of faqItems) {
    await client.create({ _type: "faqItem", ...f });
  }
  console.log(`  Created ${faqItems.length} FAQ items.\n`);

  // ─── Core Values ───
  console.log("Creating Core Values...");
  const coreValues = [
    {
      title: "Grace",
      subtitle: "It all starts here.",
      colorVar: "var(--color-sky)",
      description:
        "Our standing rests entirely on the unmerited favor we receive in Christ.",
      extendedDetails:
        "In a world driven by performance and merit, grace is radically countercultural. We believe that God\u2019s love isn\u2019t a wage we earn but a gift we receive through faith. This reality frees us from the exhausting treadmill of self-justification, allowing us to be honest about our failures and genuinely compassionate toward others\u2019 shortcomings. Grace doesn\u2019t just save us; it continuously transforms us, melting our pride and reshaping our hearts into the image of Christ.",
      verses: [
        {
          _key: "v1",
          reference: "Ephesians 2:8\u20139",
          text: "For by grace you have been saved through faith. And this is not your own doing; it is the gift of God, not a result of works, so that no one may boast.",
        },
        {
          _key: "v2",
          reference: "Romans 5:8",
          text: "But God shows his love for us in that while we were still sinners, Christ died for us.",
        },
        {
          _key: "v3",
          reference: "Titus 3:5",
          text: "He saved us, not because of works done by us in righteousness, but according to his own mercy.",
        },
      ],
      order: 1,
    },
    {
      title: "Truth",
      subtitle: "Anchored in Scripture.",
      colorVar: "var(--color-navy)",
      description:
        "We are committed to the objective, unchanging truth revealed in the Bible.",
      extendedDetails:
        "In an age of subjective morality and skepticism, we stand unapologetically on the absolute truth of God\u2019s Word. We hold to the inerrancy and authority of Scripture, and are anchored in the deep theological commitments of the Reformed tradition. Truth is not just a concept to be debated but a reality to be lived. Engaging faithfully with truth means wrestling with hard texts, cultivating the life of the mind, and allowing God\u2019s Word to confront, comfort, and direct every aspect of our lives.",
      verses: [
        {
          _key: "v1",
          reference: "John 17:17",
          text: "Sanctify them in the truth; your word is truth.",
        },
        {
          _key: "v2",
          reference: "2 Timothy 3:16\u201317",
          text: "All Scripture is breathed out by God and profitable for teaching, for reproof, for correction, and for training in righteousness, that the man of God may be complete, equipped for every good work.",
        },
        {
          _key: "v3",
          reference: "Psalm 119:105",
          text: "Your word is a lamp to my feet and a light to my path.",
        },
      ],
      order: 2,
    },
    {
      title: "Hospitality",
      subtitle: "A welcoming culture.",
      colorVar: "var(--color-poppy)",
      description:
        "Because God welcomed us, we open our lives, homes, and hearts to others.",
      extendedDetails:
        "Hospitality at its core is not about entertaining; it is about making strangers into neighbors, and neighbors into family. It reflects the very heart of the Gospel\u2014that while we were enemies, Christ welcomed us. We are dedicated to creating a \u2018Gospel-culture\u2019 where outcasts find a seat at the table, where the lonely find community, and where differences are bridged by the unifying love of Jesus. It is a profound, practical apologetic to a fractured world.",
      verses: [
        {
          _key: "v1",
          reference: "Romans 15:7",
          text: "Therefore welcome one another as Christ has welcomed you, for the glory of God.",
        },
        {
          _key: "v2",
          reference: "Hebrews 13:2",
          text: "Do not neglect to show hospitality to strangers, for thereby some have entertained angels unawares.",
        },
        {
          _key: "v3",
          reference: "1 Peter 4:9",
          text: "Show hospitality to one another without grumbling.",
        },
      ],
      order: 3,
    },
    {
      title: "Formation",
      subtitle: "Growing deeper.",
      colorVar: "var(--color-sea)",
      description:
        "We are intentionally formed by liturgy, education, and robust discipleship.",
      extendedDetails:
        "We are all being formed by the world around us. To counteract this, we engage in deliberate spiritual formation. This happens through the rhythms of our Sunday liturgy, rigorous biblical education, and intentional discipleship in relationships. We care deeply about the \u2018how\u2019 of spiritual growth, supporting men, women, and families in their unique paths of sanctification. Our goal is not just an exchange of information, but a holistic transformation of the soul, mind, and habits.",
      verses: [
        {
          _key: "v1",
          reference: "Romans 12:2",
          text: "Do not be conformed to this world, but be transformed by the renewal of your mind, that by testing you may discern what is the will of God.",
        },
        {
          _key: "v2",
          reference: "Colossians 3:16",
          text: "Let the word of Christ dwell in you richly, teaching and admonishing one another in all wisdom, singing psalms and hymns and spiritual songs.",
        },
        {
          _key: "v3",
          reference: "Proverbs 22:6",
          text: "Train up a child in the way he should go; even when he is old he will not depart from it.",
        },
      ],
      order: 4,
    },
    {
      title: "Kingdom",
      subtitle: "Building for generations.",
      colorVar: "var(--color-wine)",
      description:
        "We invest in institution building and mission for the next 100 years.",
      extendedDetails:
        "The Kingdom of God is a public reality, not merely a private spiritual experience. Therefore, we are committed to cultural renewal, local mission, and global outreach. We aren\u2019t just thinking about next week; we are building institutions\u2014like schools and lasting community infrastructure\u2014that will serve our city and glorify God for a hundred years to come. We seek the peace and prosperity of Bellingham, anticipating the day when Christ makes all things new.",
      verses: [
        {
          _key: "v1",
          reference: "Jeremiah 29:7",
          text: "Seek the welfare of the city where I have sent you into exile, and pray to the Lord on its behalf, for in its welfare you will find your welfare.",
        },
        {
          _key: "v2",
          reference: "Matthew 6:10",
          text: "Your kingdom come, your will be done, on earth as it is in heaven.",
        },
        {
          _key: "v3",
          reference: "Isaiah 65:21\u201322",
          text: "They shall build houses and inhabit them; they shall plant vineyards and eat their fruit\u2026for like the days of a tree shall the days of my people be.",
        },
      ],
      order: 5,
    },
  ];

  for (const v of coreValues) {
    await client.create({ _type: "coreValue", ...v });
  }
  console.log(`  Created ${coreValues.length} core values.\n`);

  // ─── Liturgical Stations ───
  console.log("Creating Liturgical Stations...");
  const stations = [
    {
      title: "Confession & Pardon",
      subtitle: "Sin Confessed, Grace Declared",
      description:
        "Having entered God\u2019s holy presence, we see ourselves rightly. Together we confess our sins \u2014 and hear His promise that we are forgiven in Christ.",
      scriptureRef: "1 John 1:9",
      extendedDetails:
        "True worship requires truth-telling. In the light of God\u2019s perfect holiness, our own sin becomes undeniable. By confessing corporately, we acknowledge that we are a community of recovering sinners. But the Gospel is an objective reality outside of ourselves \u2014 the minister stands as a herald of good news, authoritatively declaring that Christ has paid the penalty for every sin just confessed. This rhythm of confession and pardon trains our hearts to rest in grace rather than our own performance.",
      extendedVerses: ["Psalm 51:1-4", "Romans 8:1", "Colossians 2:13-14"],
      order: 1,
    },
    {
      title: "Sermon",
      subtitle: "The Preaching of God\u2019s Word",
      description:
        "The heart of the service. God speaks to His people through the faithful exposition of Scripture.",
      scriptureRef: "Romans 10:17",
      extendedDetails:
        "Preaching is the primary means God uses to awaken the dead and sanctify the living. It is not a lecture or a motivational speech, but an encounter with the living Christ through the medium of a human messenger explaining the divinely inspired text.",
      extendedVerses: [
        "2 Timothy 4:1-2",
        "Nehemiah 8:8",
        "1 Thessalonians 2:13",
      ],
      order: 2,
    },
    {
      title: "Creed & Intercession",
      subtitle: "We Respond Together",
      description:
        "Having heard God\u2019s Word, we respond with the ancient words of the Church and intercede as a royal priesthood for the suffering, the lost, and the nations.",
      scriptureRef: "Romans 10:9\u201310",
      extendedDetails:
        "The Christian faith was not invented yesterday. By confessing a historic creed, we link arms with the saints across the centuries. And as a royal priesthood, we look beyond our own walls \u2014 the pastor leads prayers bringing the tears, fears, and desperate needs of both our local community and the global world before a sovereign, merciful Father.",
      extendedVerses: ["1 Timothy 2:1-2", "Jude 1:3", "Ephesians 6:18"],
      order: 3,
    },
    {
      title: "Table & Sending",
      subtitle: "Communion and Benediction",
      description:
        "Christ invites us to His table \u2014 in bread and wine we receive His body broken and blood shed. Then God has the last word, blessing and sending us into the world.",
      scriptureRef: "1 Corinthians 11:26",
      extendedDetails:
        "The Eucharist is the family meal of the new covenant. It uniquely engages our physical senses\u2014taste, touch, sight, and smell\u2014to reassure us of Christ\u2019s spiritual presence. And then we are blessed in order to be a blessing. The benediction is not simply a dismissal, but an impartation of divine grace and peace meant to empower us for our weekly liturgy of loving our neighbors and serving our city.",
      extendedVerses: [
        "Matthew 26:26-28",
        "Numbers 6:24-26",
        "2 Corinthians 13:14",
      ],
      order: 4,
    },
  ];

  for (const s of stations) {
    await client.create({ _type: "liturgicalStation", ...s });
  }
  console.log(`  Created ${stations.length} liturgical stations.\n`);

  // ─── Visit Page (singleton) ───
  console.log("Creating Visit Page...");
  await client.createOrReplace({
    _id: "visitPage",
    _type: "visitPage",
    serviceAddress: "2826 Birchwood Avenue",
    serviceTimes: ["9:00 am", "11:00 am"],
    nurseryInfo:
      "Nursery is offered for children ages 0\u20132 during the entire 9am service.\nAt our 9am service, children ages 3\u20137 are dismissed during the sermon for an age-appropriate Bible lesson and then welcomed back into the service about 40 minutes later.\nChildren are always welcome to remain in either service for the entire time, and we have our foyer and nursing mother\u2019s room available to parents as well.",
    bulletinLink:
      "https://christchurchbellingham.org/s/Sunday-March-1-2026.pdf",
    sidebarImage: visitSidebarImage,
    whatToExpect:
      'Though we observe historic church traditions, we are definitely a \u201cBellingham church.\u201d Dress is casual. The music is eclectic Americana folk. Our manner is informal but sincere. Expect both joy and gravity as we approach the Almighty God.',
  });
  console.log("  Done.\n");

  // ─── Doctrine Page (singleton) ───
  console.log("Creating Doctrine Page...");
  await client.createOrReplace({
    _id: "doctrinePage",
    _type: "doctrinePage",
    doctrines: [
      {
        _key: "d1",
        category: "The Trinity",
        content:
          "There is one God, who exists eternally in three persons: the Father, the Son, and the Holy Spirit. He is the sovereign Creator and Sustainer of all things.",
      },
      {
        _key: "d2",
        category: "The Scriptures",
        content:
          "The Bible is the written word of God, inspired by the Holy Spirit and without error in the original manuscripts. It is the infallible and authoritative rule for all matters of faith and practice.",
      },
      {
        _key: "d3",
        category: "Humanity & Sin",
        content:
          "All are sinners and totally unable to save themselves from God\u2019s displeasure, except by his mercy. Without Christ, we are separated from the life of God.",
      },
      {
        _key: "d4",
        category: "Sovereign Grace",
        content:
          "Salvation is by God alone as He sovereignly chooses those He will save. His choice is based purely on his grace, not on any human individual merit or foreseen faith.",
      },
      {
        _key: "d5",
        category: "The Son",
        content:
          "Jesus Christ is the eternal Son of God, who through his perfect life and sacrificial death atoned for the sins of all who will trust in him, alone, for salvation.",
      },
      {
        _key: "d6",
        category: "The Holy Spirit",
        content:
          "The Holy Spirit indwells God\u2019s people, giving them the strength and wisdom to trust Christ and follow him, producing the fruit of righteousness in their lives.",
      },
      {
        _key: "d7",
        category: "The Covenant",
        content:
          "God is gracious and faithful to his people not simply as individuals but as families in successive generations according to his covenant promises.",
      },
      {
        _key: "d8",
        category: "The Return",
        content:
          "Jesus will return, bodily and visibly, to judge all mankind and to receive his people to himself, bringing about the new heavens and the new earth.",
      },
      {
        _key: "d9",
        category: "Reformed Theology",
        content:
          "We embrace the rich theological heritage of the Protestant Reformation, emphasizing God\u2019s total sovereignty in salvation and the supreme authority of the Scriptures.",
      },
    ],
    pressResources: [
      {
        _key: "p1",
        resourceType: "Podcast",
        title: "Christ Church Bellingham Podcast",
        description:
          "An extension of our preaching ministry, renewing our minds in the truth of God.",
        url: "https://podcasts.apple.com/us/podcast/renew-northwest-podcast/id1724059937",
        color: "var(--color-sky)",
      },
      {
        _key: "p2",
        resourceType: "Article",
        title: "Some Thoughts on Mentorship",
        description:
          "Equipping emerging leaders with biblical guidance and wisdom for life.",
        url: "https://christchurchpress.com/faith-life/some-thoughts-on-mentorship",
        color: "var(--color-navy)",
      },
      {
        _key: "p3",
        resourceType: "Article",
        title: "A Resource for the Season of Lent",
        description:
          "The Reformed Hours of Prayer app to organize communal life around prayer.",
        url: "https://christchurchpress.com/ministry-mission/a-resource-for-the-season-of-lent",
        color: "var(--color-gold-dk)",
      },
      {
        _key: "p4",
        resourceType: "Article",
        title: "TCS Statement on Creation",
        description:
          "Science depends on the foundations of Scripture, affirming a biblical view of creation.",
        url: "https://christchurchpress.com/faith-life/tcs-statement-on-creation",
        color: "var(--color-paper)",
      },
    ],
  });
  console.log("  Done.\n");

  // ─── Ministry Pages ───
  console.log("Creating Ministry Pages...");
  const ministries = [
    { slug: "ccbmen", title: "Men\u2019s Ministry", heroImage: mensHero },
    { slug: "ccbwomen", title: "Women\u2019s Ministry", heroImage: womensHero },
    { slug: "youth", title: "Youth Ministry", heroImage: youthHero },
    {
      slug: "childrens-ministry",
      title: "Children\u2019s Ministry",
      heroImage: childrensHero,
    },
    {
      slug: "discipleship-groups",
      title: "Discipleship Groups",
      heroImage: discipleshipHero,
    },
    {
      slug: "home-fellowships",
      title: "Home Fellowships",
      heroImage: homeFellowshipsHero,
    },
    {
      slug: "missions-blog",
      title: "Missionaries",
      heroImage: missionsHero,
    },
    {
      slug: "hospitality-ministry-1",
      title: "Hospitality Ministry",
      heroImage: hospitalityHero,
    },
  ];

  for (const m of ministries) {
    await client.create({
      _type: "ministryPage",
      slug: { _type: "slug", current: m.slug },
      title: m.title,
      heroImage: m.heroImage,
    });
  }
  console.log(`  Created ${ministries.length} ministry pages.\n`);

  console.log("Seeding complete!");
}

seed().catch((err) => {
  console.error("Seeding failed:", err);
  process.exit(1);
});
