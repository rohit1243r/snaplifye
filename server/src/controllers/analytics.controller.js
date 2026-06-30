import Project from "../models/project.model.js";
import Contact from "../models/contact.model.js";
import Quote from "../models/quote.model.js";
import Visitor from "../models/visitor.model.js";
import Testimonial from "../models/testimonial.model.js";

export const getAnalytics = async (req, res) => {
  try {
    // ---- Stats Cards ----
    const visitorDoc = await Visitor.findOne();
    const visitors = visitorDoc?.count || 0;

    const totalLeads = await Quote.countDocuments();
    const contactRequests = await Contact.countDocuments();
    const totalProjects = await Project.countDocuments();
    const totalTestimonials = await Testimonial.countDocuments();

    // ---- Leads Trend (last 30 days) ----
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const recentQuotes = await Quote.find({ createdAt: { $gte: thirtyDaysAgo } })
      .select("createdAt")
      .sort({ createdAt: 1 });

    const leadsTrend = [];
    for (let i = 0; i < 30; i++) {
      const date = new Date();
      date.setDate(date.getDate() - (29 - i));
      const dateStr = date.toISOString().slice(0, 10);
      const label = date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
      const count = recentQuotes.filter(
        (q) => q.createdAt.toISOString().slice(0, 10) === dateStr
      ).length;
      leadsTrend.push({ date: label, count });
    }

    // ---- Weekly aggregation ----
    const fourWeeksAgo = new Date();
    fourWeeksAgo.setDate(fourWeeksAgo.getDate() - 28);

    const weeklyQuotes = await Quote.find({ createdAt: { $gte: fourWeeksAgo } })
      .select("createdAt");

    const weeklyLeads = [];
    for (let w = 0; w < 4; w++) {
      const weekStart = new Date();
      weekStart.setDate(weekStart.getDate() - (28 - w * 7));
      const weekEnd = new Date(weekStart);
      weekEnd.setDate(weekEnd.getDate() + 6);
      const count = weeklyQuotes.filter(
        (q) => q.createdAt >= weekStart && q.createdAt <= weekEnd
      ).length;
      weeklyLeads.push({
        week: `W${w + 1}`,
        count,
      });
    }

    // ---- Monthly aggregation ----
    const allQuotes = await Quote.find().select("createdAt");
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const monthlyLeads = months.map((month, index) => ({
      month,
      leads: allQuotes.filter((q) => new Date(q.createdAt).getMonth() === index).length,
    }));

    // ---- Contact Requests by Date (last 7 days) ----
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const recentContacts = await Contact.find({ createdAt: { $gte: sevenDaysAgo } })
      .select("createdAt")
      .sort({ createdAt: 1 });

    const contactsByDate = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date();
      date.setDate(date.getDate() - (6 - i));
      const label = date.toLocaleDateString("en-US", { weekday: "short" });
      const count = recentContacts.filter(
        (c) => c.createdAt.toISOString().slice(0, 10) === date.toISOString().slice(0, 10)
      ).length;
      contactsByDate.push({ day: label, count });
    }

    // ---- Project Categories ----
    const projects = await Project.find().select("category");
    const categoryMap = {};
    projects.forEach((p) => {
      categoryMap[p.category] = (categoryMap[p.category] || 0) + 1;
    });
    const projectCategories = Object.entries(categoryMap).map(([name, value]) => ({
      name,
      value,
    }));

    // ---- Recent Activity (last 10) ----
    const recentQuotesList = await Quote.find()
      .select("name status createdAt")
      .sort({ createdAt: -1 })
      .limit(5);

    const recentContactsList = await Contact.find()
      .select("name createdAt")
      .sort({ createdAt: -1 })
      .limit(3);

    const recentProjects = await Project.find()
      .select("title createdAt")
      .sort({ createdAt: -1 })
      .limit(3);

    const recentTestimonials = await Testimonial.find()
      .select("name createdAt")
      .sort({ createdAt: -1 })
      .limit(2);

    const recentActivity = [
      ...recentQuotesList.map((q) => ({
        type: "lead",
        text: `New lead: ${q.name}`,
        status: q.status,
        time: q.createdAt,
      })),
      ...recentContactsList.map((c) => ({
        type: "contact",
        text: `New contact: ${c.name}`,
        time: c.createdAt,
      })),
      ...recentProjects.map((p) => ({
        type: "project",
        text: `Project added: ${p.title}`,
        time: p.createdAt,
      })),
      ...recentTestimonials.map((t) => ({
        type: "testimonial",
        text: `Testimonial from ${t.name}`,
        time: t.createdAt,
      })),
    ]
      .sort((a, b) => new Date(b.time) - new Date(a.time))
      .slice(0, 10);

    // ---- Latest Leads (for table) ----
    const latestLeads = await Quote.find()
      .select("name email phone status createdAt")
      .sort({ createdAt: -1 })
      .limit(10);

    // ---- Visitor increment (track visit) ----
    if (visitorDoc) {
      await Visitor.findByIdAndUpdate(visitorDoc._id, { $inc: { count: 1 } });
    }

    res.status(200).json({
      success: true,
      data: {
        stats: { visitors, totalLeads, contactRequests, totalProjects, totalTestimonials },
        leadsTrend,
        weeklyLeads,
        monthlyLeads,
        contactsByDate,
        projectCategories,
        recentActivity,
        latestLeads,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
