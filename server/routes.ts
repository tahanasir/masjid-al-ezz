import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import {
  insertContactMessageSchema,
  insertDonationSchema,
} from "@shared/schema";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";
import { z } from "zod";

// Event registration schema
const eventRegistrationSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  additionalGuests: z.number().min(0).default(0),
  specialRequirements: z.string().optional(),
  addToMailingList: z.boolean().default(true),
  eventId: z.number(),
});

export async function registerRoutes(app: Express): Promise<Server> {
  // API Routes - all routes are prefixed with /api

  // Get all announcements
  app.get("/api/announcements", async (req: Request, res: Response) => {
    try {
      const isActive =
        req.query.active === "true"
          ? true
          : req.query.active === "false"
            ? false
            : undefined;

      const announcements = await storage.getAnnouncements(isActive);
      res.json(announcements);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch announcements" });
    }
  });

  // Get an announcement by ID
  app.get("/api/announcements/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const announcement = await storage.getAnnouncementById(id);

      if (!announcement) {
        return res.status(404).json({ message: "Announcement not found" });
      }

      res.json(announcement);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch announcement" });
    }
  });

  // Get all events
  app.get("/api/events", async (req: Request, res: Response) => {
    try {
      const isActive =
        req.query.active === "true"
          ? true
          : req.query.active === "false"
            ? false
            : undefined;

      const events = await storage.getEvents(isActive);
      res.json(events);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch events" });
    }
  });

  // Get an event by ID
  app.get("/api/events/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const event = await storage.getEventById(id);

      if (!event) {
        return res.status(404).json({ message: "Event not found" });
      }

      res.json(event);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch event" });
    }
  });

  // Get all programs
  app.get("/api/programs", async (req: Request, res: Response) => {
    try {
      const isActive =
        req.query.active === "true"
          ? true
          : req.query.active === "false"
            ? false
            : undefined;

      const programs = await storage.getPrograms(isActive);
      res.json(programs);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch programs" });
    }
  });

  // Get a program by ID
  app.get("/api/programs/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const program = await storage.getProgramById(id);

      if (!program) {
        return res.status(404).json({ message: "Program not found" });
      }

      res.json(program);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch program" });
    }
  });

  // Create a contact message
  app.post("/api/contact", async (req: Request, res: Response) => {
    try {
      const contactData = insertContactMessageSchema.parse(req.body);
      const contactMessage = await storage.createContactMessage(contactData);
      res.status(201).json(contactMessage);
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        return res.status(400).json({ message: validationError.message });
      }
      res.status(500).json({ message: "Failed to create contact message" });
    }
  });

  // Create a donation
  app.post("/api/donations", async (req: Request, res: Response) => {
    try {
      const donationData = insertDonationSchema.parse(req.body);
      const donation = await storage.createDonation(donationData);
      res.status(201).json(donation);
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        return res.status(400).json({ message: validationError.message });
      }
      res.status(500).json({ message: "Failed to process donation" });
    }
  });

  // Get prayer times from MasjidBox API
  app.get("/api/prayer-times", async (req: Request, res: Response) => {
    try {
      // Date parameters
      const date = req.query.date
        ? new Date(req.query.date as string)
        : new Date();
      const dateString = date.toISOString().split("T")[0];

      // Fetch prayer times from MasjidBox API
      // Note: In a production environment, you should use your own MasjidBox API credentials
      // Here we're using an iframe embed approach as a fallback

      // This is a fallback for demonstration - in production, use MasjidBox API
      const prayerTimes = {
        // Adhan times (call to prayer)
        fajr: "5:45 AM",
        sunrise: "7:15 AM",
        dhuhr: "12:15 PM",
        asr: "4:30 PM",
        maghrib: "7:00 PM",
        isha: "8:30 PM",

        // Iqamah times (start of congregational prayer)
        fajrIqamah: "6:15 AM",
        dhuhrIqamah: "1:30 PM",
        asrIqamah: "5:15 PM",
        maghribIqamah: "7:10 PM", // Maghrib is usually 10 minutes after Adhan
        ishaIqamah: "9:00 PM",

        date: dateString,
        readable: date.toLocaleDateString("en-US", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        }),
        timestamp: date.getTime(),
        masjidBoxUrl:
          "https://masjidbox.com/prayer-times/masjid-al-ezz-peel-muslim-community-centre", // Replace with actual MasjidBox URL
      };

      res.json(prayerTimes);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch prayer times" });
    }
  });

  // Get weekly prayer times from MasjidBox
  app.get("/api/prayer-times/week", async (req: Request, res: Response) => {
    try {
      const startDate = new Date();
      const weeklyTimes = [];

      // In a real implementation, this would fetch a week's worth of prayer times
      // from the MasjidBox API in a single call

      // For demonstration purposes, we're using placeholder data
      // In production, these would come from the MasjidBox API
      const prayerTimesByDay = [
        {
          // Adhan times (call to prayer)
          fajr: "5:45 AM",
          sunrise: "7:15 AM",
          dhuhr: "12:15 PM",
          asr: "4:30 PM",
          maghrib: "7:00 PM",
          isha: "8:30 PM",
          // Iqamah times (start of congregational prayer)
          fajrIqamah: "6:15 AM",
          dhuhrIqamah: "1:30 PM",
          asrIqamah: "5:15 PM",
          maghribIqamah: "7:10 PM",
          ishaIqamah: "9:00 PM",
        },
        {
          fajr: "5:44 AM",
          sunrise: "7:14 AM",
          dhuhr: "12:15 PM",
          asr: "4:31 PM",
          maghrib: "7:01 PM",
          isha: "8:31 PM",
          fajrIqamah: "6:15 AM",
          dhuhrIqamah: "1:30 PM",
          asrIqamah: "5:15 PM",
          maghribIqamah: "7:11 PM",
          ishaIqamah: "9:00 PM",
        },
        {
          fajr: "5:43 AM",
          sunrise: "7:13 AM",
          dhuhr: "12:15 PM",
          asr: "4:32 PM",
          maghrib: "7:02 PM",
          isha: "8:32 PM",
          fajrIqamah: "6:15 AM",
          dhuhrIqamah: "1:30 PM",
          asrIqamah: "5:15 PM",
          maghribIqamah: "7:12 PM",
          ishaIqamah: "9:00 PM",
        },
        {
          fajr: "5:42 AM",
          sunrise: "7:12 AM",
          dhuhr: "12:15 PM",
          asr: "4:33 PM",
          maghrib: "7:03 PM",
          isha: "8:33 PM",
          fajrIqamah: "6:15 AM",
          dhuhrIqamah: "1:30 PM",
          asrIqamah: "5:15 PM",
          maghribIqamah: "7:13 PM",
          ishaIqamah: "9:00 PM",
        },
        {
          fajr: "5:41 AM",
          sunrise: "7:11 AM",
          dhuhr: "12:15 PM",
          asr: "4:34 PM",
          maghrib: "7:04 PM",
          isha: "8:34 PM",
          fajrIqamah: "6:15 AM",
          dhuhrIqamah: "1:30 PM",
          asrIqamah: "5:15 PM",
          maghribIqamah: "7:14 PM",
          ishaIqamah: "9:00 PM",
        },
        {
          fajr: "5:40 AM",
          sunrise: "7:10 AM",
          dhuhr: "12:15 PM",
          asr: "4:35 PM",
          maghrib: "7:05 PM",
          isha: "8:35 PM",
          fajrIqamah: "6:15 AM",
          dhuhrIqamah: "1:30 PM",
          asrIqamah: "5:15 PM",
          maghribIqamah: "7:15 PM",
          ishaIqamah: "9:00 PM",
        },
        {
          fajr: "5:39 AM",
          sunrise: "7:09 AM",
          dhuhr: "12:15 PM",
          asr: "4:36 PM",
          maghrib: "7:06 PM",
          isha: "8:36 PM",
          fajrIqamah: "6:15 AM",
          dhuhrIqamah: "1:30 PM",
          asrIqamah: "5:15 PM",
          maghribIqamah: "7:16 PM",
          ishaIqamah: "9:00 PM",
        },
      ];

      for (let i = 0; i < 7; i++) {
        const currentDate = new Date(startDate);
        currentDate.setDate(startDate.getDate() + i);
        const dayTimes = prayerTimesByDay[i];

        weeklyTimes.push({
          date: currentDate.toISOString().split("T")[0],
          day: currentDate.toLocaleDateString("en-US", { weekday: "long" }),
          readable: currentDate.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
          }),

          // Adhan times
          fajr: dayTimes.fajr,
          sunrise: dayTimes.sunrise,
          dhuhr: dayTimes.dhuhr,
          asr: dayTimes.asr,
          maghrib: dayTimes.maghrib,
          isha: dayTimes.isha,

          // Iqamah times
          fajrIqamah: dayTimes.fajrIqamah,
          dhuhrIqamah: dayTimes.dhuhrIqamah,
          asrIqamah: dayTimes.asrIqamah,
          maghribIqamah: dayTimes.maghribIqamah,
          ishaIqamah: dayTimes.ishaIqamah,

          jummuah: i === 5 ? "1:15 PM" : null, // Friday has Jummuah
          masjidBoxUrl:
            "https://masjidbox.com/prayer-times/masjid-al-ezz-peel-muslim-community-centre", // Replace with actual MasjidBox URL
        });
      }

      res.json(weeklyTimes);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch weekly prayer times" });
    }
  });

  // Register for an event
  app.post("/api/events/register", async (req: Request, res: Response) => {
    try {
      const registrationData = eventRegistrationSchema.parse(req.body);

      // In a real implementation, we would store this data in the database
      // For now, we'll just log it to demonstrate functionality
      console.log("Event registration received:", registrationData);

      // Check if event exists
      const event = await storage.getEventById(registrationData.eventId);
      if (!event) {
        return res.status(404).json({ message: "Event not found" });
      }

      // Mock successful registration
      // In a real implementation, we would:
      // 1. Store the registration in the database
      // 2. Add the user to the mailing list if requested
      // 3. Send a confirmation email

      // Mock response data
      const response = {
        success: true,
        message: "Registration successful",
        data: {
          name: registrationData.name,
          email: registrationData.email,
          eventId: registrationData.eventId,
          eventTitle: event.title,
          registrationDate: new Date().toISOString(),
          addedToMailingList: registrationData.addToMailingList,
        },
      };

      res.status(201).json(response);
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        return res.status(400).json({ message: validationError.message });
      }
      res.status(500).json({ message: "Failed to process event registration" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
