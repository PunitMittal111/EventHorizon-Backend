const mongoose = require("mongoose");

const VenueSchema = new mongoose.Schema({
  name: String,
  address: String,
  city: String,
  state: String,
  country: String,
  zipCode: String,
  latitude: Number,
  longitude: Number,
  capacity: Number,
  amenities: [String],
  contactInfo: Object,
});

const CategorySchema = new mongoose.Schema({
  name: String,
  description: String,
  color: String,
  icon: String,
  isDefault: Boolean,
});

const AnalyticsSchema = new mongoose.Schema({
  totalViews: { type: Number, default: 0 },
  uniqueViews: { type: Number, default: 0 },
  totalTicketsSold: { type: Number, default: 0 },
  totalRevenue: { type: Number, default: 0 },
  conversionRate: { type: Number, default: 0 },
  topTrafficSources: [String],
  geographicData: [Object],
  dailyStats: [Object],
  deviceStats: {
    desktop: { type: Number, default: 0 },
    mobile: { type: Number, default: 0 },
    tablet: { type: Number, default: 0 },
  },
});

const SettingsSchema = new mongoose.Schema({
  allowWaitlist: Boolean,
  requireApproval: Boolean,
  collectAttendeeInfo: Boolean,
  enableQRCode: Boolean,
  enableSocialSharing: Boolean,
  enableComments: Boolean,
});

const SeoSchema = new mongoose.Schema({
  metaTitle: String,
  metaDescription: String,
  keywords: [String],
});

const TicketSchema = new mongoose.Schema({
  name: String,
  price: Number,
  quantity: Number,
});

const EventSchema = new mongoose.Schema(
  {
    orgName: { type: String },
    title: { type: String, required: true },
    description: String,
    shortDescription: String,
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    timezone: String,
    eventType: {
      type: String,
      enum: ["in-person", "virtual", "hybrid"],
      default: "in-person",
    },
    venue: { type: VenueSchema },
    virtualEventUrl: String,
    imageUrl: String,
    galleryImages: [String],
    category: [CategorySchema],
    customTags: [String],
    status: {
      type: String,
      enum: ["draft", "published", "completed", "cancelled", "archived"],
      default: "draft",
    },
    visibility: {
      type: String,
      enum: ["public", "private", "unlisted"],
      default: "public",
    },
    maxAttendees: Number,
    currentAttendees: { type: Number, default: 0 },
    tickets: [TicketSchema],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    publishedAt: Date,
    analytics: AnalyticsSchema,
    settings: SettingsSchema,
    seo: SeoSchema,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Event", EventSchema);
