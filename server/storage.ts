import {
  announcements,
  type Announcement,
  type InsertAnnouncement,
  events,
  type Event,
  type InsertEvent,
  programs,
  type Program,
  type InsertProgram,
  contactMessages,
  type ContactMessage,
  type InsertContactMessage,
  donations,
  type Donation,
  type InsertDonation,
  users,
  type User,
  type InsertUser,
  businesses,
  type Business,
  type InsertBusiness,
} from "@shared/schema";

// Storage interface
export interface IStorage {
  // Users
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // Announcements
  getAnnouncements(active?: boolean): Promise<Announcement[]>;
  getAnnouncementById(id: number): Promise<Announcement | undefined>;
  createAnnouncement(announcement: InsertAnnouncement): Promise<Announcement>;
  updateAnnouncement(
    id: number,
    announcement: Partial<InsertAnnouncement>,
  ): Promise<Announcement | undefined>;
  deleteAnnouncement(id: number): Promise<boolean>;

  // Events
  getEvents(active?: boolean): Promise<Event[]>;
  getEventById(id: number): Promise<Event | undefined>;
  createEvent(event: InsertEvent): Promise<Event>;
  updateEvent(
    id: number,
    event: Partial<InsertEvent>,
  ): Promise<Event | undefined>;
  deleteEvent(id: number): Promise<boolean>;

  // Programs
  getPrograms(active?: boolean): Promise<Program[]>;
  getProgramById(id: number): Promise<Program | undefined>;
  createProgram(program: InsertProgram): Promise<Program>;
  updateProgram(
    id: number,
    program: Partial<InsertProgram>,
  ): Promise<Program | undefined>;
  deleteProgram(id: number): Promise<boolean>;

  // Contact Messages
  getContactMessages(): Promise<ContactMessage[]>;
  getContactMessageById(id: number): Promise<ContactMessage | undefined>;
  createContactMessage(message: InsertContactMessage): Promise<ContactMessage>;
  markContactMessageAsRead(id: number): Promise<ContactMessage | undefined>;
  deleteContactMessage(id: number): Promise<boolean>;

  // Donations
  createDonation(donation: InsertDonation): Promise<Donation>;
  getDonations(): Promise<Donation[]>;

  // Local Businesses
  getBusinesses(active?: boolean): Promise<Business[]>;
  getBusinessById(id: number): Promise<Business | undefined>;
  createBusiness(business: InsertBusiness): Promise<Business>;
  updateBusiness(
    id: number,
    business: Partial<InsertBusiness>,
  ): Promise<Business | undefined>;
  deleteBusiness(id: number): Promise<boolean>;
  getFeaturedBusinesses(): Promise<Business[]>;
  getBusinessesByCategory(category: string): Promise<Business[]>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private announcements: Map<number, Announcement>;
  private events: Map<number, Event>;
  private programs: Map<number, Program>;
  private contactMessages: Map<number, ContactMessage>;
  private donations: Map<number, Donation>;
  private businesses: Map<number, Business>;

  private currentUserId: number;
  private currentAnnouncementId: number;
  private currentEventId: number;
  private currentProgramId: number;
  private currentContactMessageId: number;
  private currentDonationId: number;
  private currentBusinessId: number;

  constructor() {
    this.users = new Map();
    this.announcements = new Map();
    this.events = new Map();
    this.programs = new Map();
    this.contactMessages = new Map();
    this.donations = new Map();
    this.businesses = new Map();

    this.currentUserId = 1;
    this.currentAnnouncementId = 1;
    this.currentEventId = 1;
    this.currentProgramId = 1;
    this.currentContactMessageId = 1;
    this.currentDonationId = 1;
    this.currentBusinessId = 1;

    // Initialize with sample data
    this.initializeData();
  }

  // Initialize with sample data
  private initializeData() {
    // Initialize with the current active programs from the roadmap (boxing, quran, ilm & chill)

    // Program 1: PMCC Sports (Boxing)
    this.createProgram({
      title: "PMCC Sports - Brother's Boxing",
      description:
        "Sports program promoting health and unity. A structured boxing program for youth that teaches discipline, fitness, and self-defense in a safe, Islamic environment.",
      schedule: "Every Saturday",
      time: "4:00 PM - 5:30 PM",
      instructor: "Coach Sabber",
      image:
        "https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      location: "Community Center Hall",
      cost: "$50/month",
      registrationRequired: true,
      startDate: new Date(new Date().getFullYear(), new Date().getMonth(), 5), // 5th of current month
      endDate: new Date(new Date().getFullYear(), new Date().getMonth() + 3, 5), // 5th, 3 months from now
      isActive: true,
    });

    // Program 2: Quran Program
    this.createProgram({
      title: "Quran Program",
      description:
        "Transformation through the Quran. A structured Quran memorization and study program focusing on proper tajweed, understanding, and application of Quranic teachings.",
      schedule: "Every Saturday & Sunday",
      time: "10:00 AM - 12:00 PM",
      instructor: "Sheikh Ahmed",
      image:
        "https://images.unsplash.com/photo-1609599006353-e629aaabfeae?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      location: "Classroom 1 (2nd Floor)",
      cost: "$60/month",
      registrationRequired: true,
      startDate: new Date(new Date().getFullYear(), new Date().getMonth(), 1), // 1st of current month
      endDate: new Date(new Date().getFullYear(), new Date().getMonth() + 3, 1), // 1st, 3 months from now
      isActive: true,
    });

    // Program 3: PMCC VM (Visionary Muslimahs)
    this.createProgram({
      title: "PMCC VM (Visionary Muslimahs)",
      description:
        "Empowering young sisters with leadership skills. A comprehensive program for Muslim women covering leadership, Islamic knowledge, and personal development.",
      schedule: "Every Tuesday",
      time: "6:30 PM - 8:00 PM",
      instructor: "Sister Aisha",
      image:
        "https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      location: "Classroom 3 (2nd Floor)",
      cost: "$50/month",
      registrationRequired: true,
      startDate: new Date(new Date().getFullYear(), new Date().getMonth(), 15), // 15th of current month
      endDate: new Date(
        new Date().getFullYear(),
        new Date().getMonth() + 2,
        15,
      ), // 15th, 2 months from now
      isActive: true,
    });

    // Add sample events
    const now = new Date();

    // Regular weekly recurring events (like Jumaa)
    this.createEvent({
      title: "Friday Prayer (Jumu'ah)",
      description:
        "Weekly Friday congregational prayer with khutbah addressing contemporary issues from an Islamic perspective.",
      date: new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate() + ((5 - now.getDay() + 7) % 7),
      ), // Next Friday
      endDate: new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate() + ((5 - now.getDay() + 7) % 7),
      ),
      startTime: "13:15", // 1:15 PM
      endTime: "14:30", // 2:30 PM
      location: "Main Prayer Hall (1st Floor)",
      organizer: "Imam Abdullah",
      isActive: true,
      eventType: "regular",
      isRecurring: true,
      recurringDay: "Friday",
    });

    // Weekly Quran Halaqa (circle)
    this.createEvent({
      title: "Weekly Quran Halaqa",
      description:
        "Join us for a weekly group study of the Quran. Open to all, no registration required.",
      date: new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate() + ((3 - now.getDay() + 7) % 7),
      ), // Next Wednesday
      endDate: new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate() + ((3 - now.getDay() + 7) % 7),
      ),
      startTime: "19:30", // 7:30 PM
      endTime: "21:00", // 9:00 PM
      location: "Main Prayer Hall (1st Floor)",
      organizer: "Sheikh Ahmed",
      isActive: true,
      eventType: "regular",
      isRecurring: true,
      recurringDay: "Wednesday",
    });

    // Ilm & Chill - Friday Tafseer Night (regular event from the roadmap)
    this.createEvent({
      title: "Ilm & Chill - Friday Tafseer Night",
      description:
        "A place where youth can grow in faith, knowledge, and friendship. Evening session on Quranic interpretation (Tafseer) focusing on selected surahs in a relaxed, youth-friendly atmosphere.",
      date: new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate() + ((5 - now.getDay() + 7) % 7),
      ), // Next Friday
      endDate: new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate() + ((5 - now.getDay() + 7) % 7),
      ),
      startTime: "19:45", // 7:45 PM
      endTime: "21:30", // 9:30 PM
      location: "Main Prayer Hall (1st Floor)",
      organizer: "Sheikh Muhammad",
      isActive: true,
      eventType: "regular",
      isRecurring: true,
      recurringDay: "Friday",
    });

    // Special one-time events
    this.createEvent({
      title: "Community Iftar Planning",
      description:
        "Join us to plan and organize community iftars for the upcoming month of Ramadan.",
      date: new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate() + 15,
        19,
        0,
      ), // 15 days from now at 7pm
      endDate: new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate() + 15,
        21,
        0,
      ), // 15 days from now at 9pm
      startTime: "19:00", // 7:00 PM
      endTime: "21:00", // 9:00 PM
      location: "Main Prayer Hall (1st Floor)",
      organizer: "Imam Abdullah",
      isActive: true,
      eventType: "special",
      isRecurring: false,
    });

    this.createEvent({
      title: "Family Day Gathering",
      description:
        "A day filled with fun activities for the whole family, including games, food, and educational workshops.",
      date: new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate() + 24,
        10,
        0,
      ), // 24 days from now at 10am
      endDate: new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate() + 24,
        14,
        0,
      ), // 24 days from now at 2pm
      startTime: "10:00", // 10:00 AM
      endTime: "14:00", // 2:00 PM
      location: "Main Prayer Hall (1st Floor) and Yard",
      organizer: "Sister Aisha",
      isActive: true,
      eventType: "special",
      isRecurring: false,
    });

    // Add sample announcements
    this.createAnnouncement({
      title: "Ramadan 2024 Planning Meeting",
      content:
        "Join us after Isha prayer this Friday to help plan for the upcoming Ramadan activities and iftar schedule.",
      date: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 4), // 4 days from now
      isActive: true,
    });

    // Add sample businesses
    this.createBusiness({
      name: "Halal Delights Restaurant",
      description:
        "Family-owned halal restaurant serving authentic Middle Eastern and Mediterranean cuisine since 2010.",
      category: "Food & Dining",
      address: "123 Main Street, Mississauga, ON L5B 1A9",
      phone: "905-555-1234",
      email: "info@halaldelights.com",
      website: "https://www.halaldelights.com",
      logoUrl:
        "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      discount: "10% off for Masjid Al-Ezz members",
      featured: true,
      active: true,
    });

    this.createBusiness({
      name: "Baraka Grocery & Halal Meat",
      description:
        "Your one-stop shop for all halal meat, international groceries, and fresh produce from local farmers.",
      category: "Grocery & Food Market",
      address: "456 Oak Avenue, Mississauga, ON L5C 2B8",
      phone: "905-555-5678",
      email: "contact@barakagrocery.ca",
      website: "https://www.barakagrocery.ca",
      logoUrl:
        "https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      discount: "5% discount on purchases over $50",
      featured: true,
      active: true,
    });

    this.createBusiness({
      name: "Modest Fashion Boutique",
      description:
        "Contemporary modest fashion for the modern Muslim woman, featuring exclusive designs and ethical production.",
      category: "Clothing & Fashion",
      address: "789 Cedar Lane, Mississauga, ON L5D 3C7",
      phone: "905-555-9012",
      email: "hello@modestfashion.ca",
      website: "https://www.modestfashion.ca",
      logoUrl:
        "https://images.unsplash.com/photo-1589483232097-11d9a01184e3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      discount: "15% off your first purchase with code MASJID15",
      featured: false,
      active: true,
    });

    this.createBusiness({
      name: "Barakah Financial Services",
      description:
        "Ethical financial planning, investment advice, and Islamic mortgage solutions compliant with Sharia principles.",
      category: "Professional Services",
      address: "101 Finance Drive, Suite 200, Mississauga, ON L5E 4D6",
      phone: "905-555-3456",
      email: "info@barakahfinancial.com",
      website: "https://www.barakahfinancial.com",
      logoUrl:
        "https://images.unsplash.com/photo-1551836022-d5d88e9218df?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      discount: "Free initial consultation for Masjid Al-Ezz community members",
      featured: true,
      active: true,
    });

    this.createBusiness({
      name: "Salam Tech Solutions",
      description:
        "Muslim-owned tech company offering web development, mobile apps, and IT consulting services to small businesses.",
      category: "Technology",
      address: "222 Tech Boulevard, Mississauga, ON L5F 5E5",
      phone: "905-555-7890",
      email: "support@salamtech.ca",
      website: "https://www.salamtech.ca",
      logoUrl:
        "https://images.unsplash.com/photo-1581089778245-3ce67677f718?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      discount: "20% discount on website maintenance packages",
      featured: false,
      active: true,
    });
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  // Announcement methods
  async getAnnouncements(active?: boolean): Promise<Announcement[]> {
    const announcements = Array.from(this.announcements.values());

    if (active !== undefined) {
      return announcements.filter(
        (announcement) => announcement.isActive === active,
      );
    }

    return announcements;
  }

  async getAnnouncementById(id: number): Promise<Announcement | undefined> {
    return this.announcements.get(id);
  }

  async createAnnouncement(
    announcement: InsertAnnouncement,
  ): Promise<Announcement> {
    const id = this.currentAnnouncementId++;
    // Ensure isActive is set to a boolean value
    const newAnnouncement: Announcement = {
      ...announcement,
      id,
      isActive:
        announcement.isActive !== undefined ? announcement.isActive : true,
    };
    this.announcements.set(id, newAnnouncement);
    return newAnnouncement;
  }

  async updateAnnouncement(
    id: number,
    announcement: Partial<InsertAnnouncement>,
  ): Promise<Announcement | undefined> {
    const existingAnnouncement = this.announcements.get(id);

    if (!existingAnnouncement) {
      return undefined;
    }

    const updatedAnnouncement: Announcement = {
      ...existingAnnouncement,
      ...announcement,
    };

    this.announcements.set(id, updatedAnnouncement);
    return updatedAnnouncement;
  }

  async deleteAnnouncement(id: number): Promise<boolean> {
    return this.announcements.delete(id);
  }

  // Event methods
  async getEvents(active?: boolean): Promise<Event[]> {
    const events = Array.from(this.events.values());

    if (active !== undefined) {
      return events.filter((event) => event.isActive === active);
    }

    return events;
  }

  async getEventById(id: number): Promise<Event | undefined> {
    return this.events.get(id);
  }

  async createEvent(event: InsertEvent): Promise<Event> {
    const id = this.currentEventId++;
    // Ensure required fields have values
    const newEvent: Event = {
      ...event,
      id,
      startTime: event.startTime || "09:00",
      endTime: event.endTime || "17:00",
      isActive: event.isActive !== undefined ? event.isActive : true,
      organizer: event.organizer || null,
      eventType: event.eventType || "special",
      isRecurring: event.isRecurring !== undefined ? event.isRecurring : false,
      recurringDay: event.recurringDay || null,
    };
    this.events.set(id, newEvent);
    return newEvent;
  }

  async updateEvent(
    id: number,
    event: Partial<InsertEvent>,
  ): Promise<Event | undefined> {
    const existingEvent = this.events.get(id);

    if (!existingEvent) {
      return undefined;
    }

    const updatedEvent: Event = {
      ...existingEvent,
      ...event,
    };

    this.events.set(id, updatedEvent);
    return updatedEvent;
  }

  async deleteEvent(id: number): Promise<boolean> {
    return this.events.delete(id);
  }

  // Program methods
  async getPrograms(active?: boolean): Promise<Program[]> {
    const programs = Array.from(this.programs.values());

    if (active !== undefined) {
      return programs.filter((program) => program.isActive === active);
    }

    return programs;
  }

  async getProgramById(id: number): Promise<Program | undefined> {
    return this.programs.get(id);
  }

  async createProgram(program: InsertProgram): Promise<Program> {
    const id = this.currentProgramId++;
    // Ensure required fields have values
    const newProgram: Program = {
      ...program,
      id,
      isActive: program.isActive !== undefined ? program.isActive : true,
      image: program.image !== undefined ? program.image : null,
      time: program.time || null,
      instructor: program.instructor || null,
      location: program.location || "Main Prayer Hall (1st Floor)",
      cost: program.cost || null,
      registrationRequired:
        program.registrationRequired !== undefined
          ? program.registrationRequired
          : true,
      startDate: program.startDate || null,
      endDate: program.endDate || null,
    };
    this.programs.set(id, newProgram);
    return newProgram;
  }

  async updateProgram(
    id: number,
    program: Partial<InsertProgram>,
  ): Promise<Program | undefined> {
    const existingProgram = this.programs.get(id);

    if (!existingProgram) {
      return undefined;
    }

    const updatedProgram: Program = {
      ...existingProgram,
      ...program,
    };

    this.programs.set(id, updatedProgram);
    return updatedProgram;
  }

  async deleteProgram(id: number): Promise<boolean> {
    return this.programs.delete(id);
  }

  // Contact Message methods
  async getContactMessages(): Promise<ContactMessage[]> {
    return Array.from(this.contactMessages.values());
  }

  async getContactMessageById(id: number): Promise<ContactMessage | undefined> {
    return this.contactMessages.get(id);
  }

  async createContactMessage(
    message: InsertContactMessage,
  ): Promise<ContactMessage> {
    const id = this.currentContactMessageId++;
    const newMessage: ContactMessage = {
      ...message,
      id,
      createdAt: new Date(),
      isRead: false,
    };

    this.contactMessages.set(id, newMessage);
    return newMessage;
  }

  async markContactMessageAsRead(
    id: number,
  ): Promise<ContactMessage | undefined> {
    const message = this.contactMessages.get(id);

    if (!message) {
      return undefined;
    }

    const updatedMessage: ContactMessage = {
      ...message,
      isRead: true,
    };

    this.contactMessages.set(id, updatedMessage);
    return updatedMessage;
  }

  async deleteContactMessage(id: number): Promise<boolean> {
    return this.contactMessages.delete(id);
  }

  // Donation methods
  async createDonation(donation: InsertDonation): Promise<Donation> {
    const id = this.currentDonationId++;
    // Ensure required fields have values
    const newDonation: Donation = {
      ...donation,
      id,
      createdAt: new Date(),
      name: donation.name || null,
      email: donation.email || null,
      transactionId: donation.transactionId || null,
    };

    this.donations.set(id, newDonation);
    return newDonation;
  }

  async getDonations(): Promise<Donation[]> {
    return Array.from(this.donations.values());
  }

  // Business methods
  async getBusinesses(active?: boolean): Promise<Business[]> {
    const businesses = Array.from(this.businesses.values());

    if (active !== undefined) {
      return businesses.filter((business) => business.active === active);
    }

    return businesses;
  }

  async getBusinessById(id: number): Promise<Business | undefined> {
    return this.businesses.get(id);
  }

  async createBusiness(business: InsertBusiness): Promise<Business> {
    const id = this.currentBusinessId++;
    const newBusiness: Business = {
      ...business,
      id,
      active: business.active !== undefined ? business.active : true,
      featured: business.featured !== undefined ? business.featured : false,
      createdAt: new Date(),
    };
    this.businesses.set(id, newBusiness);
    return newBusiness;
  }

  async updateBusiness(
    id: number,
    business: Partial<InsertBusiness>,
  ): Promise<Business | undefined> {
    const existingBusiness = this.businesses.get(id);

    if (!existingBusiness) {
      return undefined;
    }

    const updatedBusiness: Business = {
      ...existingBusiness,
      ...business,
    };

    this.businesses.set(id, updatedBusiness);
    return updatedBusiness;
  }

  async deleteBusiness(id: number): Promise<boolean> {
    return this.businesses.delete(id);
  }

  async getFeaturedBusinesses(): Promise<Business[]> {
    const businesses = Array.from(this.businesses.values());
    return businesses.filter(
      (business) => business.featured && business.active,
    );
  }

  async getBusinessesByCategory(category: string): Promise<Business[]> {
    const businesses = Array.from(this.businesses.values());
    return businesses.filter(
      (business) => business.category === category && business.active,
    );
  }
}

export const storage = new MemStorage();
