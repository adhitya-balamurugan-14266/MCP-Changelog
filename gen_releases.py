#!/usr/bin/env python3
"""Generate releases.ts with tool arrays from release-notes.json."""

import json

# Load JSON tool data
with open("/Users/adhitya-14266/Downloads/release-notes.json") as f:
    data = json.load(f)

# Build service → tools map
tool_map = {}
for change in data["changes"]:
    tool_map[change["service"]] = {
        "newTools": change.get("newTools", []),
        "removedTools": change.get("removedTools", []),
    }

def ts_str_array(tools, indent=4):
    """Format a Python list as a TypeScript string array literal."""
    if not tools:
        return "[]"
    pad = " " * indent
    inner = " " * (indent + 2)
    lines = ["["]
    for t in tools:
        escaped = t.replace("\\", "\\\\").replace("'", "\\'")
        lines.append(f"{inner}'{escaped}',")
    lines.append(f"{pad}]")
    return "\n".join(lines)

def tool_fields(service_key):
    """Return the newTools/removedTools lines for a given service key."""
    entry = tool_map.get(service_key, {})
    new_t = entry.get("newTools", [])
    rem_t = entry.get("removedTools", [])
    parts = []
    if new_t:
        parts.append(f"    newTools: {ts_str_array(new_t)},")
    if rem_t:
        parts.append(f"    removedTools: {ts_str_array(rem_t)},")
    return "\n".join(parts)

content = """import type { Release } from '@/types';

export const RELEASES: Release[] = [
  // ─── June 2026 ────────────────────────────────────────────────────────

  // New Services
  {
    id: 'jun-2026-01',
    date: '2026-06-01',
    title: 'Zoho Connect — New Service',
    description:
      'Zoho Connect is now available as an MCP service. The integration ships with over 250 tools covering the full social collaboration surface: posts, announcements, boards, events, groups, forums, polls, tasks, manuals, articles, bookmarks, notifications, comment threads, and user interactions.',
    category: 'New Service',
    services: ['Zoho Connect'],
    dataCenters: ['US', 'EU', 'IN', 'AU', 'JP', 'CA', 'SA'],
{ZohoConnect}
  },
  {
    id: 'jun-2026-02',
    date: '2026-06-01',
    title: 'Zoho Tables — New Service',
    description:
      'Zoho Tables joins the MCP catalog with 75 tools for low-code database management. Agents can create and manage workspaces, bases, tables, fields, records, views, filters, sorts, automations, portals, and selection options — enabling structured data workflows without a UI.',
    category: 'New Service',
    services: ['Zoho Tables'],
    dataCenters: ['US', 'EU', 'IN', 'AU', 'JP', 'CA', 'SA'],
{ZohoTables}
  },

  // Tool Changes & Major Additions
  {
    id: 'jun-2026-03',
    date: '2026-06-01',
    title: 'Zoho CRM — Blueprint, Functions & Backup Tools Added',
    description:
      '45 new tools added to Zoho CRM spanning blueprint lifecycle management (create, update, delete, activate, reorder states and transitions, export as image), custom serverless functions (create, update, delete, publish, get code), scheduled data backups, deduplication job management, and Zia notification configuration. Two deprecated tools (deletePortal, getCustomButtonAssociatedDetails) have been removed.',
    category: 'Tool Change',
    services: ['Zoho CRM'],
    dataCenters: ['US', 'EU', 'IN', 'AU', 'JP', 'CA', 'SA'],
{ZohoCRM}
  },
  {
    id: 'jun-2026-04',
    date: '2026-06-01',
    title: 'Zoho Invoice — Comprehensive Invoicing Tool Suite',
    description:
      'Zoho Invoice adds an extensive set of tools covering the complete invoicing lifecycle: contacts, credit notes, estimates, invoices, customer payments, projects, time entries, taxes, currencies, exchange rates, recurring invoices, retainer invoices, expenses, expense categories, employees, price lists, and organizations. Five legacy attachment tools have been removed.',
    category: 'Tool Change',
    services: ['Zoho Invoice'],
    dataCenters: ['US', 'EU', 'IN', 'AU', 'JP', 'CA', 'SA'],
{ZohoInvoice}
  },
  {
    id: 'jun-2026-05',
    date: '2026-06-01',
    title: 'Zoho IoT — Platform Management Tools Added',
    description:
      'Zoho IoT adds an extensive toolkit for full IoT platform management: devices, models, locations, assets, certificates, policies, commands, alarm rules, dashboards, reports, scheduled actions, webhooks, workflows, user groups, data points, custom views, notification profiles, and push notifications. Two legacy tools (Get_Datapoint_Groups, Import_Datapoint_Group) have been removed.',
    category: 'Tool Change',
    services: ['Zoho IoT'],
    dataCenters: ['US', 'EU', 'IN', 'AU', 'JP', 'CA', 'SA'],
{ZohoIoT}
  },
  {
    id: 'jun-2026-06',
    date: '2026-06-01',
    title: 'Zoho Payroll — 28 New Payroll Management Tools',
    description:
      'Zoho Payroll adds 28 new tools covering bank account management (create, get, list, update, delete, mark as primary), compensation request workflows (create, approve, reject, cancel), reimbursement claim management, job definitions, payrun integrations, and employee federal and state tax detail updates.',
    category: 'New Tool',
    services: ['Zoho Payroll'],
    dataCenters: ['US', 'EU', 'IN', 'AU', 'JP', 'CA', 'SA'],
{ZohoPayroll}
  },
  {
    id: 'jun-2026-07',
    date: '2026-06-01',
    title: 'Zoho Billing — Price Lists, Comments & Coupon Tools Added',
    description:
      '21 new tools added to Zoho Billing: full price list CRUD (create, get, list, delete, update items and line items), plan and addon comment management (add, list, delete), bulk and individual coupon set activation/deactivation, plan free/non-free marking, and product email template updates. A large set of legacy tools from the previous platform version has been retired.',
    category: 'Tool Change',
    services: ['Zoho Billing'],
    dataCenters: ['US', 'EU', 'IN', 'AU', 'JP', 'CA', 'SA'],
{ZohoBilling}
  },
  {
    id: 'jun-2026-08',
    date: '2026-06-01',
    title: 'Zoho ERP — Reimbursement, Compensation & Pricebook Tools Added',
    description:
      '21 new tools added to Zoho ERP covering reimbursement claim management (create, approve, reject, list), addon and plan comment management, bulk and individual coupon set activation/deactivation, pricebook item and line item updates, and product email template configuration. 22 legacy file attachment tools have been retired.',
    category: 'Tool Change',
    services: ['Zoho ERP'],
    dataCenters: ['US', 'EU', 'IN', 'AU', 'JP', 'CA', 'SA'],
{ZohoERP}
  },
  {
    id: 'jun-2026-09',
    date: '2026-06-01',
    title: 'Zoho Projects — Blueprint & Tag Management Tools Added',
    description:
      '14 new tools added to Zoho Projects: blueprint lifecycle management (execute transitions, get transition and pre-transition data, preview blueprints, list blueprints and next transitions), comprehensive tag management (create, update, delete, get all tags, associate and disassociate from entities, get project tags), and portal profile and role listing.',
    category: 'New Tool',
    services: ['Zoho Projects'],
    dataCenters: ['US', 'EU', 'IN', 'AU', 'JP', 'CA', 'SA'],
{ZohoProjects}
  },
  {
    id: 'jun-2026-10',
    date: '2026-06-01',
    title: 'Zoho Backstage — Event & Order Management Tools Added',
    description:
      '14 new tools added to Zoho Backstage: event creation, order creation and request retrieval, RSVP guest creation and listing, ticket class creation, contact group and member management (create, get, list), exhibitor lead and request tracking, event payment type retrieval, and registration form field listing.',
    category: 'New Tool',
    services: ['Zoho Backstage'],
    dataCenters: ['US', 'EU', 'IN', 'AU', 'JP', 'CA', 'SA'],
{ZohoBackstage}
  },
  {
    id: 'jun-2026-11',
    date: '2026-06-01',
    title: 'Zoho WorkDrive — 8 New File Management Tools',
    description:
      'Zoho WorkDrive expands its MCP integration with 8 new tools: bulk copy and update for files and folders, file upload and new version upload, server file version download, file query execution, and bulk follow-update management.',
    category: 'New Tool',
    services: ['WorkDrive'],
    dataCenters: ['US', 'EU', 'IN', 'AU', 'JP', 'CA', 'SA'],
{ZohoWorkdrive}
  },
  {
    id: 'jun-2026-12',
    date: '2026-06-01',
    title: 'Zoho Analytics — exportDataView Tool Added',
    description:
      'Zoho Analytics adds the exportDataView tool, enabling AI agents to export analytics views and reports programmatically through MCP without opening the Analytics console.',
    category: 'New Tool',
    services: ['Zoho Analytics'],
    dataCenters: ['US', 'EU', 'IN', 'AU', 'JP', 'CA', 'SA'],
{ZohoAnalytics}
  },

  // Tool Removals
  {
    id: 'jun-2026-13',
    date: '2026-06-01',
    title: 'Zoho Books — Attachment Tools Removed',
    description:
      '26 file attachment tools have been removed from Zoho Books, covering attachment management for bills, invoices, purchase orders, sales orders, retainer invoices, delivery challans, expense receipts, journals, and task documents.',
    category: 'Tool Removed',
    services: ['Zoho Books'],
    dataCenters: ['US', 'EU', 'IN', 'AU', 'JP', 'CA', 'SA'],
{ZohoBooks}
  },
  {
    id: 'jun-2026-14',
    date: '2026-06-01',
    title: 'Zoho Inventory — Attachment Tools Removed',
    description:
      '12 file attachment tools have been removed from Zoho Inventory, covering attachment management for delivery challans, invoices, retainer invoices, move orders, putaway documents, and task attachments.',
    category: 'Tool Removed',
    services: ['Zoho Inventory'],
    dataCenters: ['US', 'EU', 'IN', 'AU', 'JP', 'CA', 'SA'],
{ZohoInventory}
  },
  {
    id: 'jun-2026-15',
    date: '2026-06-01',
    title: 'Zoho Procurement — Purchase Order Attachment Tools Removed',
    description:
      '3 purchase order attachment tools have been removed from Zoho Procurement: add_purchase_order_attachment, get_purchase_order_attachment, and update_purchase_order_attachment.',
    category: 'Tool Removed',
    services: ['Zoho Procurement'],
    dataCenters: ['US', 'EU', 'IN', 'AU', 'JP', 'CA', 'SA'],
{ZohoProcurement}
  },
  {
    id: 'jun-2026-16',
    date: '2026-06-01',
    title: 'Zoho Creator — getFields Tool Removed',
    description: 'The getFields tool has been removed from Zoho Creator.',
    category: 'Tool Removed',
    services: ['Zoho Creator'],
    dataCenters: ['US', 'EU', 'IN', 'AU', 'JP', 'CA', 'SA'],
{ZohoCreator}
  },
  {
    id: 'jun-2026-17',
    date: '2026-06-01',
    title: 'Zoho Mail — getMessageAttachmentContent Tool Removed',
    description: 'The getMessageAttachmentContent tool has been removed from Zoho Mail.',
    category: 'Tool Removed',
    services: ['Zoho Mail'],
    dataCenters: ['US', 'EU', 'IN', 'AU', 'JP', 'CA', 'SA'],
{ZohoMail}
  },
];
"""

# Replace each {ServiceKey} placeholder with the actual tool fields
service_keys = [
    "ZohoConnect", "ZohoTables", "ZohoCRM", "ZohoInvoice", "ZohoIoT",
    "ZohoPayroll", "ZohoBilling", "ZohoERP", "ZohoProjects", "ZohoBackstage",
    "ZohoWorkdrive", "ZohoAnalytics", "ZohoBooks", "ZohoInventory",
    "ZohoProcurement", "ZohoCreator", "ZohoMail",
]

for key in service_keys:
    fields = tool_fields(key)
    content = content.replace("{" + key + "}", fields)

# Write the output
out_path = "/Users/adhitya-14266/ClaudeApps/MCP-Changelog/web-source/src/data/releases.ts"
with open(out_path, "w") as f:
    f.write(content)

print(f"Written to {out_path}")
# Verify sizes
for key in service_keys:
    entry = tool_map.get(key, {})
    nt = len(entry.get("newTools", []))
    rt = len(entry.get("removedTools", []))
    print(f"  {key}: {nt} new, {rt} removed")
