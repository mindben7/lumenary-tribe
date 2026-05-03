import {
  pgTable,
  text,
  timestamp,
  uuid,
  boolean,
  integer,
  jsonb,
  pgEnum,
} from "drizzle-orm/pg-core";

// --- CORE BOS TABLES ---

export const personStatusEnum = pgEnum("person_status", ["prospect", "applicant", "active", "paused", "alumnus"]);
export const personSourceEnum = pgEnum("person_source", ["chamber", "referral", "web", "event", "other"]);

export const people = pgTable("people", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  email: text("email"),
  phone: text("phone"),
  status: personStatusEnum("status").default("prospect"),
  source: personSourceEnum("source").default("other"),
  assignedChapterId: uuid("assigned_chapter_id"),
  benNotes: text("ben_notes"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const chapters = pgTable("chapters", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  region: text("region"),
  leaderUserId: text("leader_user_id"),
  capacityTarget: integer("capacity_target"),
  locationMeta: jsonb("location_meta"),
});

export const memberships = pgTable("memberships", {
  id: uuid("id").primaryKey().defaultRandom(),
  personId: uuid("person_id").references(() => people.id),
  chapterId: uuid("chapter_id").references(() => chapters.id),
  tier: text("tier"),
  pricePaid: integer("price_paid"),
  startedOn: timestamp("started_on"),
  endedOn: timestamp("ended_on"),
  status: text("status"), // active | paused | ended
});

// --- CHRONOS TABLES ---

export const timelines = pgTable("timelines", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  ownerId: text("owner_id").notNull(), // Clerk User ID
  description: text("description"),
  anchorDate: timestamp("anchor_date").defaultNow(),
  config: jsonb("config").$type<{ zoomLevel: string; activeLanes: string[] }>(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const timelineEvents = pgTable("timeline_events", {
  id: uuid("id").primaryKey().defaultRandom(),
  timelineId: uuid("timeline_id").references(() => timelines.id),
  laneId: text("lane_id").notNull(), 
  label: text("label").notNull(),
  description: text("description"),
  startDate: timestamp("start_date").notNull(),
  endDate: timestamp("end_date"), 
  type: text("type").notNull(), // milestone | task | phase
  parentId: uuid("parent_id"), 
  sourceFile: text("source_file"), 
  isAiExtracted: boolean("is_ai_extracted").default(false),
  confidence: integer("confidence"), 
  metadata: jsonb("metadata"), 
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const timelineEdges = pgTable("timeline_edges", {
  id: uuid("id").primaryKey().defaultRandom(),
  timelineId: uuid("timeline_id").references(() => timelines.id),
  sourceId: uuid("source_id").references(() => timelineEvents.id),
  targetId: uuid("target_id").references(() => timelineEvents.id),
  type: text("type").notNull(), // causes | depends-on | related-to
});

export const ingestionRuns = pgTable("ingestion_runs", {
  id: uuid("id").primaryKey().defaultRandom(),
  timelineId: uuid("timeline_id").references(() => timelines.id),
  status: text("status"), // processing | completed | failed
  fileHashes: jsonb("file_hashes").$type<Record<string, string>>(),
  tokensConsumed: integer("tokens_consumed"),
  runAt: timestamp("run_at").defaultNow(),
});
