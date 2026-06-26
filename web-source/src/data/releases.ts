import type { Release } from '@/types';

export const RELEASES: Release[] = [
  // ─── June 2026 ────────────────────────────────────────────────────────
  {
    id: 'jun-19-2026-01',
    date: '2026-06-19',
    title: 'Zoho Recruit — Tool Enhancements & Updated Schema',
    description:
      'Updated Recruit tools now surface structured candidate and job-opening data with refined field mappings. Interview scheduling and pipeline-stage tools reflect the latest Recruit API v3 schema.',
    category: 'Tool Change',
    services: ['Zoho Recruit'],
    dataCenters: ['US', 'EU', 'IN', 'AU', 'JP', 'CA', 'SA'],
  },
  {
    id: 'jun-19-2026-02',
    date: '2026-06-19',
    title: 'Catalyst Signals — Webhook Trigger Support',
    description:
      'Catalyst Signals now exposes webhook-trigger tools, enabling AI agents to register and manage event-driven workflows directly through MCP without opening the Catalyst console.',
    category: 'New Tool',
    services: ['Catalyst Signals'],
    dataCenters: ['US', 'EU', 'IN', 'AU', 'JP', 'CA', 'SA'],
  },
  {
    id: 'jun-19-2026-03',
    date: '2026-06-19',
    title: 'SalesIQ — Visitor & Conversation Tools Added',
    description:
      'New SalesIQ tools allow agents to query live visitor sessions, retrieve chat transcripts, and trigger proactive engagement flows — all via natural-language MCP calls.',
    category: 'New Tool',
    services: ['SalesIQ'],
    dataCenters: ['US', 'EU', 'IN', 'AU', 'JP', 'CA', 'SA'],
  },
  {
    id: 'jun-19-2026-04',
    date: '2026-06-19',
    title: 'Zoho Store — Order Management Enhancements',
    description:
      'Zoho Store tools gain order-status updates, refund initiation, and inventory sync capabilities, completing the core commerce-operations surface in MCP.',
    category: 'Enhancement',
    services: ['Zoho Store'],
    dataCenters: ['US', 'EU', 'IN', 'AU'],
  },
  // ─── 10 Jun 2026 ──────────────────────────────────────────────────────
  {
    id: 'jun-10-2026-01',
    date: '2026-06-10',
    title: 'Zoho Calendar v2 — Full Event Lifecycle Tools',
    description:
      'Rebuilt Calendar integration brings create, update, delete, and query tools for events, recurring schedules, and attendee management via the Calendar API v2.',
    category: 'New Tool',
    services: ['Zoho Calendar'],
    dataCenters: ['US', 'EU', 'IN', 'AU', 'JP', 'CA', 'SA'],
  },
  {
    id: 'jun-10-2026-02',
    date: '2026-06-10',
    title: 'Zoho Logs — Query & Stream Tools',
    description:
      'Zoho Logs joins the MCP catalog with tools to search log streams, filter by severity and time range, and tail live log feeds from Catalyst apps and connected services.',
    category: 'New Service',
    services: ['Zoho Logs'],
    dataCenters: ['US', 'EU', 'IN', 'AU', 'JP', 'CA', 'SA'],
  },
  {
    id: 'jun-10-2026-03',
    date: '2026-06-10',
    title: 'Zoho Creator — App & Form CRUD Tools',
    description:
      'Zoho Creator is now MCP-enabled. Agents can list apps, read and write form records, trigger workflows, and manage reports entirely through conversational AI prompts.',
    category: 'New Service',
    services: ['Zoho Creator'],
    dataCenters: ['US', 'EU', 'IN', 'AU', 'JP', 'CA', 'SA'],
  },
  {
    id: 'jun-10-2026-04',
    date: '2026-06-10',
    title: 'SalesIQ — Initial MCP Integration',
    description:
      'SalesIQ becomes an MCP-supported service. The initial toolset covers department management, operator assignment, and canned-response retrieval.',
    category: 'New Service',
    services: ['SalesIQ'],
    dataCenters: ['US', 'EU', 'IN', 'AU', 'JP', 'CA', 'SA'],
  },
  {
    id: 'jun-10-2026-05',
    date: '2026-06-10',
    title: 'Qntrl — Workflow & Stage Tools',
    description:
      'Qntrl (workflow orchestration) integrates with MCP, exposing tools to trigger orchestrations, query stage transitions, and manage workflow instances through AI agents.',
    category: 'New Service',
    services: ['Qntrl'],
    dataCenters: ['US', 'EU', 'IN'],
  },
  {
    id: 'jun-10-2026-06',
    date: '2026-06-10',
    title: 'Export View Tool Added Across Data Services',
    description:
      'A new Export View tool is available across CRM, Desk, and Projects, enabling agents to pull structured data exports for downstream analysis without manual console steps.',
    category: 'New Tool',
    services: ['Zoho CRM', 'Zoho Desk', 'Zoho Projects'],
    dataCenters: ['US', 'EU', 'IN', 'AU', 'JP', 'CA', 'SA'],
  },
  // ─── 8 Jun 2026 ───────────────────────────────────────────────────────
  {
    id: 'jun-08-2026-01',
    date: '2026-06-08',
    title: 'Zoho POS — Transaction & Inventory Tool Updates',
    description:
      'Zoho POS tools are updated to support multi-location inventory queries and daily sales-summary retrieval, aligned with the POS API v2 release.',
    category: 'Tool Change',
    services: ['Zoho POS'],
    dataCenters: ['US', 'EU', 'IN', 'AU'],
  },
  {
    id: 'jun-08-2026-02',
    date: '2026-06-08',
    title: 'Zoho Cliq — OAS Schema Alignment',
    description:
      'Cliq MCP tools are updated to align with the latest OpenAPI Specification (OAS) schema changes, fixing parameter naming inconsistencies in message-post and channel-management tools.',
    category: 'Tool Change',
    services: ['Zoho Cliq'],
    dataCenters: ['US', 'EU', 'IN', 'AU', 'JP', 'CA', 'SA'],
  },
  // ─── 4 Jun 2026 ───────────────────────────────────────────────────────
  {
    id: 'jun-04-2026-01',
    date: '2026-06-04',
    title: 'Site24x7 — Monitor Management Tools',
    description:
      'Site24x7 joins MCP with tools to create and update monitors, query alert history, acknowledge incidents, and retrieve uptime reports through conversational AI.',
    category: 'New Service',
    services: ['Site24x7'],
    dataCenters: ['US', 'EU', 'IN', 'AU', 'JP', 'CA', 'SA'],
  },
  {
    id: 'jun-04-2026-02',
    date: '2026-06-04',
    title: 'Zoho Show — Presentation Tools Added',
    description:
      'Zoho Show gains an MCP toolset covering slide creation, theme application, and presentation export — enabling agents to draft slide decks from structured data.',
    category: 'New Tool',
    services: ['Zoho Show'],
    dataCenters: ['US', 'EU', 'IN', 'AU', 'JP', 'CA', 'SA'],
  },
  {
    id: 'jun-04-2026-03',
    date: '2026-06-04',
    title: 'Catalyst Signals — Event Subscription Tools',
    description:
      'Catalyst Signals debuts in the MCP catalog with tools to subscribe to platform events, manage signal rules, and trigger conditional automations via AI agent prompts.',
    category: 'New Service',
    services: ['Catalyst Signals'],
    dataCenters: ['US', 'EU', 'IN', 'AU', 'JP', 'CA', 'SA'],
  },
  {
    id: 'jun-04-2026-04',
    date: '2026-06-04',
    title: 'Zoho POS — Initial MCP Integration',
    description:
      'Zoho POS enters the MCP catalog. Initial tools support store configuration read, product catalog queries, and basic transaction lookup.',
    category: 'New Service',
    services: ['Zoho POS'],
    dataCenters: ['US', 'EU', 'IN', 'AU'],
  },
  {
    id: 'jun-04-2026-05',
    date: '2026-06-04',
    title: 'ServiceDesk Plus — Ticket & Asset Tools',
    description:
      'ManageEngine ServiceDesk Plus is now available through Zoho MCP. Tools cover helpdesk ticket creation, status updates, SLA queries, and CMDB asset lookups.',
    category: 'New Service',
    services: ['ServiceDesk Plus'],
    dataCenters: ['US', 'EU', 'IN', 'AU', 'JP', 'CA', 'SA'],
  },
  // ─── 1 Jun 2026 ───────────────────────────────────────────────────────
  {
    id: 'jun-01-2026-01',
    date: '2026-06-01',
    title: 'CloudSpend — Cost Analytics & Budget Tools',
    description:
      'CloudSpend joins MCP with tools to query cloud cost breakdowns, set budget alerts, and retrieve resource-level spend summaries — enabling conversational FinOps workflows.',
    category: 'New Service',
    services: ['CloudSpend'],
    dataCenters: ['US', 'EU', 'IN', 'AU'],
  },
  {
    id: 'jun-01-2026-02',
    date: '2026-06-01',
    title: 'Solopreneur — Business Insights Tools',
    description:
      'Solopreneur enters the MCP ecosystem. AI agents can now retrieve contact timelines, deal insights, and task summaries from Solopreneur using natural-language instructions.',
    category: 'New Service',
    services: ['Solopreneur'],
    dataCenters: ['US', 'EU', 'IN'],
  },
  {
    id: 'jun-01-2026-03',
    date: '2026-06-01',
    title: 'QuickML — Model Deployment & Prediction Tools',
    description:
      'QuickML joins Zoho MCP. Agents can list trained models, trigger predictions against live datasets, and retrieve model performance metrics through conversational MCP calls.',
    category: 'New Service',
    services: ['QuickML'],
    dataCenters: ['US', 'EU', 'IN', 'AU'],
  },
  // ─── 29 May 2026 ──────────────────────────────────────────────────────
  {
    id: 'may-29-2026-01',
    date: '2026-05-29',
    title: 'Zoho Recruit — MCP Integration',
    description:
      'Zoho Recruit is now MCP-enabled with tools for candidate sourcing, job-opening management, interview scheduling, and offer-letter workflows.',
    category: 'New Service',
    services: ['Zoho Recruit'],
    dataCenters: ['US', 'EU', 'IN', 'AU', 'JP', 'CA', 'SA'],
  },
  // ─── 27 May 2026 ──────────────────────────────────────────────────────
  {
    id: 'may-27-2026-01',
    date: '2026-05-27',
    title: 'Zoho Webinar — Registration & Attendee Tools',
    description:
      'Zoho Webinar joins the MCP catalog. Tools now cover webinar creation, attendee registration, reminder scheduling, and post-event analytics retrieval.',
    category: 'New Service',
    services: ['Zoho Webinar'],
    dataCenters: ['US', 'EU', 'IN', 'AU', 'JP'],
  },
  {
    id: 'may-27-2026-02',
    date: '2026-05-27',
    title: 'Zoho Store — Storefront & Catalog Tools',
    description:
      'Zoho Store is now accessible through MCP. Initial tools support product catalog management, storefront configuration, and customer order retrieval.',
    category: 'New Service',
    services: ['Zoho Store'],
    dataCenters: ['US', 'EU', 'IN', 'AU'],
  },
  // ─── 21 May 2026 ──────────────────────────────────────────────────────
  {
    id: 'may-21-2026-01',
    date: '2026-05-21',
    title: 'Zoho Vault — Secret & Credential Management Tools',
    description:
      'Zoho Vault enters the MCP catalog with tools to retrieve secrets, manage folders, and rotate credentials — enabling secure AI-driven secret operations without exposing raw values.',
    category: 'New Service',
    services: ['Zoho Vault'],
    dataCenters: ['US', 'EU', 'IN', 'AU', 'JP', 'CA', 'SA'],
  },
  {
    id: 'may-21-2026-02',
    date: '2026-05-21',
    title: 'Endpoint Central — Device & Patch Management Tools',
    description:
      'ManageEngine Endpoint Central joins MCP with tools covering device inventory, patch-status queries, remote deployment triggers, and compliance report retrieval.',
    category: 'New Service',
    services: ['Endpoint Central'],
    dataCenters: ['US', 'EU', 'IN', 'AU', 'JP', 'CA', 'SA'],
  },
  {
    id: 'may-21-2026-03',
    date: '2026-05-21',
    title: 'Zoho BFSI — Banking & Financial Services Tools',
    description:
      'Zoho BFSI debuts in MCP with specialized tools for loan origination queries, customer KYC status checks, and compliance-report generation tailored for banking workflows.',
    category: 'New Service',
    services: ['Zoho BFSI'],
    dataCenters: ['IN'],
  },
  {
    id: 'may-21-2026-04',
    date: '2026-05-21',
    title: 'Smart Transcript Tool — AI Meeting Summaries',
    description:
      'A new Smart Transcript tool leverages Zia AI to generate structured meeting summaries, action items, and speaker-attributed notes from Zoho Meeting recordings via MCP.',
    category: 'New Tool',
    services: ['Zoho CRM'],
    dataCenters: ['US', 'EU', 'IN', 'AU', 'JP', 'CA', 'SA'],
  },
  {
    id: 'may-21-2026-05',
    date: '2026-05-21',
    title: 'REST API Mirror — Generic HTTP Tool',
    description:
      'A new REST API tool allows MCP clients to issue authenticated calls to any Zoho REST API endpoint not yet covered by a dedicated tool, bridging gaps until native tools ship.',
    category: 'New Tool',
    services: ['REST API'],
    dataCenters: ['US', 'EU', 'IN', 'AU', 'JP', 'CN', 'CA', 'SA'],
  },
  // ─── April 2026 ───────────────────────────────────────────────────────
  {
    id: 'apr-15-2026-01',
    date: '2026-04-15',
    title: 'Zoho Social — Post Scheduling & Analytics Tools',
    description:
      'Zoho Social adds MCP tools for scheduling posts across channels, retrieving engagement metrics, and managing branded content calendars through AI agents.',
    category: 'New Tool',
    services: ['Zoho Social'],
    dataCenters: ['US', 'EU', 'IN', 'AU'],
  },
  {
    id: 'apr-15-2026-02',
    date: '2026-04-15',
    title: 'WorkDrive — Folder Permissions & Sharing Tools',
    description:
      'WorkDrive MCP tools are enhanced with permission management, folder sharing controls, and bulk-file move operations, enabling richer document-workflow automation.',
    category: 'Enhancement',
    services: ['WorkDrive'],
    dataCenters: ['US', 'EU', 'IN', 'AU', 'JP', 'CA', 'SA'],
  },
  {
    id: 'apr-02-2026-01',
    date: '2026-04-02',
    title: 'Zoho Sign — Document Signing Workflow Tools',
    description:
      'Zoho Sign joins MCP with tools to send documents for e-signature, track signing status, and retrieve completed agreements — eliminating manual follow-up loops.',
    category: 'New Service',
    services: ['Zoho Sign'],
    dataCenters: ['US', 'EU', 'IN', 'AU', 'JP', 'CA', 'SA'],
  },
  // ─── March 2026 ───────────────────────────────────────────────────────
  {
    id: 'mar-20-2026-01',
    date: '2026-03-20',
    title: 'Zoho Notebook — Note & Notebook CRUD Tools',
    description:
      'Zoho Notebook is now MCP-enabled. Agents can create and update notes, organize notebooks, and attach files — perfect for AI-assisted knowledge capture workflows.',
    category: 'New Service',
    services: ['Zoho Notebook'],
    dataCenters: ['US', 'EU', 'IN', 'AU', 'JP'],
  },
  {
    id: 'mar-20-2026-02',
    date: '2026-03-20',
    title: 'Zoho Connect — Community & Feed Tools',
    description:
      'Zoho Connect enters MCP with tools to post to networks, manage groups, query feed items, and retrieve employee directory data for internal-communications automation.',
    category: 'New Service',
    services: ['Zoho Connect'],
    dataCenters: ['US', 'EU', 'IN', 'AU'],
  },
  {
    id: 'mar-05-2026-01',
    date: '2026-03-05',
    title: 'Zoho Finance — Cross-App Financial Query Tools',
    description:
      'A unified Zoho Finance tool group surfaces consolidated queries across Books, Invoice, Expense, and Inventory, letting agents retrieve P&L snapshots without switching between tools.',
    category: 'Enhancement',
    services: ['Zoho Finance', 'Zoho Books', 'Zoho Invoice', 'Zoho Expense', 'Zoho Inventory'],
    dataCenters: ['US', 'EU', 'IN', 'AU', 'JP', 'CA', 'SA'],
  },
  // ─── February 2026 ────────────────────────────────────────────────────
  {
    id: 'feb-18-2026-01',
    date: '2026-02-18',
    title: 'MDM — Mobile Device Management Tools',
    description:
      'ManageEngine MDM integrates with MCP, exposing tools to enroll devices, push policies, remotely wipe lost devices, and retrieve compliance status from AI agents.',
    category: 'New Service',
    services: ['MDM'],
    dataCenters: ['US', 'EU', 'IN', 'AU', 'JP'],
  },
  {
    id: 'feb-18-2026-02',
    date: '2026-02-18',
    title: 'Zoho Billing — Subscription & Invoice Tools',
    description:
      'Zoho Billing is added to the MCP catalog with tools for subscription management, plan upgrades, invoice generation, and payment-status queries.',
    category: 'New Service',
    services: ['Zoho Billing'],
    dataCenters: ['US', 'EU', 'IN', 'AU', 'CA', 'SA'],
  },
  {
    id: 'feb-05-2026-01',
    date: '2026-02-05',
    title: 'Zoho CRM — Blueprint & Workflow Trigger Tools',
    description:
      'Zoho CRM tools now support triggering Blueprint transitions and Custom Function executions directly via MCP, enabling AI agents to advance sales processes without human intervention.',
    category: 'Enhancement',
    services: ['Zoho CRM'],
    dataCenters: ['US', 'EU', 'IN', 'AU', 'JP', 'CN', 'CA', 'SA'],
  },
  // ─── January 2026 ─────────────────────────────────────────────────────
  {
    id: 'jan-22-2026-01',
    date: '2026-01-22',
    title: 'Zoho IoT — Device & Telemetry Tools',
    description:
      'Zoho IoT joins MCP with tools to register devices, read telemetry streams, manage device groups, and configure alert thresholds — enabling AI-driven IoT operations.',
    category: 'New Service',
    services: ['Zoho IoT'],
    dataCenters: ['US', 'EU', 'IN'],
  },
  {
    id: 'jan-22-2026-02',
    date: '2026-01-22',
    title: 'Zoho Campaigns — Email Automation Tools',
    description:
      'Zoho Campaigns expands its MCP toolset with automation workflow triggers, A/B test result queries, and subscriber segment management tools.',
    category: 'Enhancement',
    services: ['Zoho Campaigns'],
    dataCenters: ['US', 'EU', 'IN', 'AU', 'JP', 'CA', 'SA'],
  },
  {
    id: 'jan-10-2026-01',
    date: '2026-01-10',
    title: 'Zoho Analytics — Report & Dashboard Query Tools',
    description:
      'Zoho Analytics enhances its MCP toolset with direct report data retrieval and dashboard widget queries, enabling AI agents to surface BI insights during conversations.',
    category: 'Enhancement',
    services: ['Zoho Analytics'],
    dataCenters: ['US', 'EU', 'IN', 'AU', 'JP', 'CN', 'CA', 'SA'],
  },
  // ─── December 2025 ────────────────────────────────────────────────────
  {
    id: 'dec-12-2025-01',
    date: '2025-12-12',
    title: 'Zoho Desk — Ticket Automation & SLA Tools',
    description:
      'Zoho Desk MCP tools gain automation rule triggers, SLA breach queries, and customer happiness rating retrieval — enabling proactive support-ops AI workflows.',
    category: 'Enhancement',
    services: ['Zoho Desk'],
    dataCenters: ['US', 'EU', 'IN', 'AU', 'JP', 'CA', 'SA'],
  },
  {
    id: 'dec-12-2025-02',
    date: '2025-12-12',
    title: 'Zoho People — Leave & Attendance Management Tools',
    description:
      'Zoho People adds leave-request, attendance-log, and shift-roster tools to MCP, enabling HR agents to handle employee self-service tasks through conversational AI.',
    category: 'Enhancement',
    services: ['Zoho People'],
    dataCenters: ['US', 'EU', 'IN', 'AU', 'JP', 'CA', 'SA'],
  },
  {
    id: 'dec-01-2025-01',
    date: '2025-12-01',
    title: 'Zoho Writer — Document Collaboration Tools',
    description:
      'Zoho Writer expands its MCP integration with collaborative document creation, comment management, and template-fill operations — bridging AI generation with live document workflows.',
    category: 'Enhancement',
    services: ['Zoho Writer'],
    dataCenters: ['US', 'EU', 'IN', 'AU', 'JP', 'CA', 'SA'],
  },
  // ─── November 2025 ────────────────────────────────────────────────────
  {
    id: 'nov-18-2025-01',
    date: '2025-11-18',
    title: 'Zoho Commerce — Storefront & Order Tools',
    description:
      'Zoho Commerce joins MCP with tools for product listing management, order fulfilment status, and customer returns — enabling conversational e-commerce operations.',
    category: 'New Service',
    services: ['Zoho Commerce'],
    dataCenters: ['US', 'EU', 'IN', 'AU'],
  },
  {
    id: 'nov-18-2025-02',
    date: '2025-11-18',
    title: 'Zoho Inventory — Stock & Purchase Order Tools',
    description:
      'Zoho Inventory is MCP-enabled with tools to query stock levels, create purchase orders, track shipments, and manage warehouse bins through AI agents.',
    category: 'New Service',
    services: ['Zoho Inventory'],
    dataCenters: ['US', 'EU', 'IN', 'AU', 'JP', 'CA'],
  },
  {
    id: 'nov-05-2025-01',
    date: '2025-11-05',
    title: 'Zoho Sheet — Spreadsheet Read/Write Tools',
    description:
      'Zoho Sheet adds MCP tools for reading cell ranges, writing data, creating worksheets, and running formula evaluations — enabling AI-powered spreadsheet automation.',
    category: 'New Service',
    services: ['Zoho Sheet'],
    dataCenters: ['US', 'EU', 'IN', 'AU', 'JP', 'CA', 'SA'],
  },
  {
    id: 'nov-05-2025-02',
    date: '2025-11-05',
    title: 'WorkDrive — File & Folder Management Tools',
    description:
      'WorkDrive joins the MCP catalog with tools to upload, download, move, and organize files and folders — turning AI agents into capable document-management assistants.',
    category: 'New Service',
    services: ['WorkDrive'],
    dataCenters: ['US', 'EU', 'IN', 'AU', 'JP', 'CA', 'SA'],
  },
  // ─── October 2025 ─────────────────────────────────────────────────────
  {
    id: 'oct-22-2025-01',
    date: '2025-10-22',
    title: 'Zoho Cliq — Messaging & Channel Management Tools',
    description:
      'Zoho Cliq joins MCP with tools for sending messages, managing channels, reading message history, and triggering bots — enabling AI-driven team communication workflows.',
    category: 'New Service',
    services: ['Zoho Cliq'],
    dataCenters: ['US', 'EU', 'IN', 'AU', 'JP', 'CA', 'SA'],
  },
  {
    id: 'oct-22-2025-02',
    date: '2025-10-22',
    title: 'Zoho Mail — Email Send & Folder Tools',
    description:
      'Zoho Mail is MCP-enabled. Agents can now send emails, search mailboxes, manage folders, and set read/unread status — completing a core productivity loop.',
    category: 'New Service',
    services: ['Zoho Mail'],
    dataCenters: ['US', 'EU', 'IN', 'AU', 'JP', 'CA', 'SA'],
  },
  {
    id: 'oct-10-2025-01',
    date: '2025-10-10',
    title: 'Zoho Analytics — Initial MCP Integration',
    description:
      'Zoho Analytics (Advanced Analytics) enters MCP with tools for workspace queries, workspace data creation, and report retrieval — giving agents direct access to Zoho BI.',
    category: 'New Service',
    services: ['Zoho Analytics'],
    dataCenters: ['US', 'EU', 'IN', 'AU', 'JP', 'CN', 'CA', 'SA'],
  },
  // ─── September 2025 — Initial Launch ──────────────────────────────────
  {
    id: 'sep-15-2025-01',
    date: '2025-09-15',
    title: 'Zoho MCP — General Availability Launch',
    description:
      'Zoho MCP is officially generally available. AI agents and MCP-compatible clients can now manage Catalyst infrastructure, CRM records, and project data through natural language — no code required.',
    category: 'New Service',
    services: ['Catalyst by Zoho'],
    dataCenters: ['US', 'EU', 'IN', 'AU', 'JP', 'CA', 'SA'],
  },
  {
    id: 'sep-15-2025-02',
    date: '2025-09-15',
    title: 'Zoho CRM — Core Object CRUD Tools',
    description:
      'Zoho CRM launches with MCP tools covering Leads, Contacts, Accounts, Deals, and Activities — create, read, update, and delete records through conversational AI clients.',
    category: 'New Service',
    services: ['Zoho CRM'],
    dataCenters: ['US', 'EU', 'IN', 'AU', 'JP', 'CN', 'CA', 'SA'],
  },
  {
    id: 'sep-15-2025-03',
    date: '2025-09-15',
    title: 'Zoho Projects — Task & Milestone Tools',
    description:
      'Zoho Projects joins MCP at launch with tools for project creation, task assignment, milestone tracking, and time-log retrieval — streamlining PM workflows via AI.',
    category: 'New Service',
    services: ['Zoho Projects'],
    dataCenters: ['US', 'EU', 'IN', 'AU', 'JP', 'CA', 'SA'],
  },
  {
    id: 'sep-15-2025-04',
    date: '2025-09-15',
    title: 'Zoho Books — Accounting & Invoice Tools',
    description:
      'Zoho Books is MCP-enabled at launch with tools covering invoices, expenses, contacts, and banking transactions — enabling AI-driven bookkeeping through natural language.',
    category: 'New Service',
    services: ['Zoho Books'],
    dataCenters: ['US', 'EU', 'IN', 'AU', 'JP', 'CA', 'SA'],
  },
  {
    id: 'sep-15-2025-05',
    date: '2025-09-15',
    title: 'Zoho Desk — Support Ticket Tools',
    description:
      'Zoho Desk launches in MCP with tools to create, update, and close support tickets, manage contacts, and retrieve agent performance stats — powering conversational support ops.',
    category: 'New Service',
    services: ['Zoho Desk'],
    dataCenters: ['US', 'EU', 'IN', 'AU', 'JP', 'CA', 'SA'],
  },
  {
    id: 'sep-15-2025-06',
    date: '2025-09-15',
    title: 'Zoho People — HR Record Tools',
    description:
      'Zoho People enters MCP at launch with employee-record queries, department management, and on-boarding task tools for AI-assisted HR operations.',
    category: 'New Service',
    services: ['Zoho People'],
    dataCenters: ['US', 'EU', 'IN', 'AU', 'JP', 'CA', 'SA'],
  },
  {
    id: 'sep-15-2025-07',
    date: '2025-09-15',
    title: 'Zoho Writer — Document Creation & Export Tools',
    description:
      'Zoho Writer launches in MCP with document creation, content editing, and PDF-export tools — giving AI agents a full prose-generation and document-management surface.',
    category: 'New Service',
    services: ['Zoho Writer'],
    dataCenters: ['US', 'EU', 'IN', 'AU', 'JP', 'CA', 'SA'],
  },
  {
    id: 'sep-15-2025-08',
    date: '2025-09-15',
    title: 'Zoho Campaigns — Mailing List & Campaign Tools',
    description:
      'Zoho Campaigns joins MCP at launch with tools for mailing list management, campaign creation, and performance metrics retrieval.',
    category: 'New Service',
    services: ['Zoho Campaigns'],
    dataCenters: ['US', 'EU', 'IN', 'AU', 'JP', 'CA', 'SA'],
  },
  {
    id: 'sep-15-2025-09',
    date: '2025-09-15',
    title: 'Zoho Expense — Expense & Report Management Tools',
    description:
      'Zoho Expense is part of the MCP launch with tools to submit expenses, manage expense reports, and retrieve reimbursement statuses through AI agents.',
    category: 'New Service',
    services: ['Zoho Expense'],
    dataCenters: ['US', 'EU', 'IN', 'AU', 'JP', 'CA', 'SA'],
  },
  {
    id: 'sep-15-2025-10',
    date: '2025-09-15',
    title: 'Zoho Invoice — Invoice & Payment Tools',
    description:
      'Zoho Invoice debuts in MCP with invoice creation, payment recording, and client statement retrieval tools — enabling AI-automated billing workflows.',
    category: 'New Service',
    services: ['Zoho Invoice'],
    dataCenters: ['US', 'EU', 'IN', 'AU', 'JP', 'CA', 'SA'],
  },
];
