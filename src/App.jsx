import { useState, useEffect } from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, LabelList } from "recharts";

/* ══════════════════════════════════════════
   JIRA DATA
══════════════════════════════════════════ */
const JIRA_VALUE = {
  All:        { Q1: { "Customer Experience": 48, Efficiency: 37, "Technology Advancement": 21 }, Q2: { "Customer Experience": 55, Efficiency: 42, "Technology Advancement": 28 }, Q3: { "Customer Experience": 61, Efficiency: 39, "Technology Advancement": 33 }, Q4: { "Customer Experience": 52, Efficiency: 44, "Technology Advancement": 30 } },
  Consumer:   { Q1: { "Customer Experience": 22, Efficiency: 11, "Technology Advancement": 7  }, Q2: { "Customer Experience": 27, Efficiency: 14, "Technology Advancement": 9  }, Q3: { "Customer Experience": 30, Efficiency: 13, "Technology Advancement": 10 }, Q4: { "Customer Experience": 25, Efficiency: 15, "Technology Advancement": 8  } },
  Business:   { Q1: { "Customer Experience": 13, Efficiency: 19, "Technology Advancement": 8  }, Q2: { "Customer Experience": 14, Efficiency: 21, "Technology Advancement": 10 }, Q3: { "Customer Experience": 16, Efficiency: 18, "Technology Advancement": 12 }, Q4: { "Customer Experience": 14, Efficiency: 20, "Technology Advancement": 11 } },
  Finance:    { Q1: { "Customer Experience": 5,  Efficiency: 3,  "Technology Advancement": 7  }, Q2: { "Customer Experience": 5,  Efficiency: 4,  "Technology Advancement": 9  }, Q3: { "Customer Experience": 6,  Efficiency: 4,  "Technology Advancement": 10 }, Q4: { "Customer Experience": 5,  Efficiency: 3,  "Technology Advancement": 8  } },
  Technology: { Q1: { "Customer Experience": 3,  Efficiency: 2,  "Technology Advancement": 7  }, Q2: { "Customer Experience": 4,  Efficiency: 2,  "Technology Advancement": 9  }, Q3: { "Customer Experience": 4,  Efficiency: 3,  "Technology Advancement": 10 }, Q4: { "Customer Experience": 4,  Efficiency: 3,  "Technology Advancement": 8  } },
  Others:     { Q1: { "Customer Experience": 5,  Efficiency: 2,  "Technology Advancement": 4  }, Q2: { "Customer Experience": 5,  Efficiency: 1,  "Technology Advancement": 3  }, Q3: { "Customer Experience": 5,  Efficiency: 1,  "Technology Advancement": 3  }, Q4: { "Customer Experience": 4,  Efficiency: 3,  "Technology Advancement": 5  } },
};
const JIRA_DELIVERY = {
  All:        { Q1: { "Delivered to UAT": 72, "Missed/In Progress": 34 }, Q2: { "Delivered to UAT": 89, "Missed/In Progress": 36 }, Q3: { "Delivered to UAT": 95, "Missed/In Progress": 38 }, Q4: { "Delivered to UAT": 81, "Missed/In Progress": 45 } },
  Consumer:   { Q1: { "Delivered to UAT": 28, "Missed/In Progress": 12 }, Q2: { "Delivered to UAT": 35, "Missed/In Progress": 15 }, Q3: { "Delivered to UAT": 40, "Missed/In Progress": 13 }, Q4: { "Delivered to UAT": 32, "Missed/In Progress": 16 } },
  Business:   { Q1: { "Delivered to UAT": 22, "Missed/In Progress": 18 }, Q2: { "Delivered to UAT": 28, "Missed/In Progress": 17 }, Q3: { "Delivered to UAT": 30, "Missed/In Progress": 16 }, Q4: { "Delivered to UAT": 25, "Missed/In Progress": 20 } },
  Finance:    { Q1: { "Delivered to UAT": 9,  "Missed/In Progress": 7  }, Q2: { "Delivered to UAT": 11, "Missed/In Progress": 8  }, Q3: { "Delivered to UAT": 12, "Missed/In Progress": 9  }, Q4: { "Delivered to UAT": 10, "Missed/In Progress": 8  } },
  Technology: { Q1: { "Delivered to UAT": 6,  "Missed/In Progress": 5  }, Q2: { "Delivered to UAT": 7,  "Missed/In Progress": 7  }, Q3: { "Delivered to UAT": 8,  "Missed/In Progress": 8  }, Q4: { "Delivered to UAT": 7,  "Missed/In Progress": 6  } },
  Others:     { Q1: { "Delivered to UAT": 7,  "Missed/In Progress": 4  }, Q2: { "Delivered to UAT": 8,  "Missed/In Progress": 3  }, Q3: { "Delivered to UAT": 5,  "Missed/In Progress": 4  }, Q4: { "Delivered to UAT": 7,  "Missed/In Progress": 5  } },
};
const JIRA_DELIVERY_SD = {
  All:        { Q1: { "Completed SD": 65, "Missed/In Progress": 41 }, Q2: { "Completed SD": 78, "Missed/In Progress": 47 }, Q3: { "Completed SD": 88, "Missed/In Progress": 45 }, Q4: { "Completed SD": 74, "Missed/In Progress": 52 } },
  Consumer:   { Q1: { "Completed SD": 25, "Missed/In Progress": 15 }, Q2: { "Completed SD": 31, "Missed/In Progress": 19 }, Q3: { "Completed SD": 36, "Missed/In Progress": 17 }, Q4: { "Completed SD": 28, "Missed/In Progress": 20 } },
  Business:   { Q1: { "Completed SD": 19, "Missed/In Progress": 21 }, Q2: { "Completed SD": 24, "Missed/In Progress": 20 }, Q3: { "Completed SD": 27, "Missed/In Progress": 19 }, Q4: { "Completed SD": 22, "Missed/In Progress": 23 } },
  Finance:    { Q1: { "Completed SD": 8,  "Missed/In Progress": 8  }, Q2: { "Completed SD": 10, "Missed/In Progress": 9  }, Q3: { "Completed SD": 12, "Missed/In Progress": 10 }, Q4: { "Completed SD": 9,  "Missed/In Progress": 9  } },
  Technology: { Q1: { "Completed SD": 5,  "Missed/In Progress": 6  }, Q2: { "Completed SD": 6,  "Missed/In Progress": 8  }, Q3: { "Completed SD": 7,  "Missed/In Progress": 9  }, Q4: { "Completed SD": 6,  "Missed/In Progress": 7  } },
  Others:     { Q1: { "Completed SD": 8,  "Missed/In Progress": 3  }, Q2: { "Completed SD": 7,  "Missed/In Progress": 4  }, Q3: { "Completed SD": 6,  "Missed/In Progress": 4  }, Q4: { "Completed SD": 9,  "Missed/In Progress": 5  } },
};
const JIRA_REJECTED = {
  All:        { Q1: { "Accepted": 81, "Back to demand": 25 }, Q2: { "Accepted": 96, "Back to demand": 29 }, Q3: { "Accepted": 102, "Back to demand": 31 }, Q4: { "Accepted": 88, "Back to demand": 38 } },
  Consumer:   { Q1: { "Accepted": 31, "Back to demand": 9  }, Q2: { "Accepted": 38, "Back to demand": 12 }, Q3: { "Accepted": 42, "Back to demand": 11 }, Q4: { "Accepted": 35, "Back to demand": 13 } },
  Business:   { Q1: { "Accepted": 24, "Back to demand": 16 }, Q2: { "Accepted": 29, "Back to demand": 16 }, Q3: { "Accepted": 32, "Back to demand": 14 }, Q4: { "Accepted": 27, "Back to demand": 18 } },
  Finance:    { Q1: { "Accepted": 11, "Back to demand": 6  }, Q2: { "Accepted": 13, "Back to demand": 7  }, Q3: { "Accepted": 15, "Back to demand": 7  }, Q4: { "Accepted": 12, "Back to demand": 8  } },
  Technology: { Q1: { "Accepted": 8,  "Back to demand": 3  }, Q2: { "Accepted": 9,  "Back to demand": 4  }, Q3: { "Accepted": 11, "Back to demand": 5  }, Q4: { "Accepted": 9,  "Back to demand": 4  } },
  Others:     { Q1: { "Accepted": 7,  "Back to demand": 4  }, Q2: { "Accepted": 7,  "Back to demand": 3  }, Q3: { "Accepted": 6,  "Back to demand": 4  }, Q4: { "Accepted": 5,  "Back to demand": 5  } },
};
const JIRA_DEL_DEMAND = {
  All:        { Q1: { "Delivered to SD": 88, "Missed/In Progress": 18 }, Q2: { "Delivered to SD": 104, "Missed/In Progress": 21 }, Q3: { "Delivered to SD": 113, "Missed/In Progress": 20 }, Q4: { "Delivered to SD": 97,  "Missed/In Progress": 29 } },
  Consumer:   { Q1: { "Delivered to SD": 34, "Missed/In Progress": 6  }, Q2: { "Delivered to SD": 42,  "Missed/In Progress": 8  }, Q3: { "Delivered to SD": 46,  "Missed/In Progress": 7  }, Q4: { "Delivered to SD": 39,  "Missed/In Progress": 9  } },
  Business:   { Q1: { "Delivered to SD": 27, "Missed/In Progress": 13 }, Q2: { "Delivered to SD": 32,  "Missed/In Progress": 13 }, Q3: { "Delivered to SD": 35,  "Missed/In Progress": 11 }, Q4: { "Delivered to SD": 29,  "Missed/In Progress": 16 } },
  Finance:    { Q1: { "Delivered to SD": 12, "Missed/In Progress": 5  }, Q2: { "Delivered to SD": 14,  "Missed/In Progress": 6  }, Q3: { "Delivered to SD": 16,  "Missed/In Progress": 6  }, Q4: { "Delivered to SD": 13,  "Missed/In Progress": 7  } },
  Technology: { Q1: { "Delivered to SD": 8,  "Missed/In Progress": 3  }, Q2: { "Delivered to SD": 9,   "Missed/In Progress": 4  }, Q3: { "Delivered to SD": 10,  "Missed/In Progress": 4  }, Q4: { "Delivered to SD": 9,   "Missed/In Progress": 4  } },
  Others:     { Q1: { "Delivered to SD": 7,  "Missed/In Progress": 3  }, Q2: { "Delivered to SD": 7,   "Missed/In Progress": 2  }, Q3: { "Delivered to SD": 6,   "Missed/In Progress": 3  }, Q4: { "Delivered to SD": 7,   "Missed/In Progress": 3  } },
};
const JIRA_DEL_DEV = {
  All:        { Q1: { "Delivered to SIT/UAT/EUT": 75, "Missed/In Progress": 31 }, Q2: { "Delivered to SIT/UAT/EUT": 90,  "Missed/In Progress": 35 }, Q3: { "Delivered to SIT/UAT/EUT": 97,  "Missed/In Progress": 36 }, Q4: { "Delivered to SIT/UAT/EUT": 83,  "Missed/In Progress": 43 } },
  Consumer:   { Q1: { "Delivered to SIT/UAT/EUT": 29, "Missed/In Progress": 11 }, Q2: { "Delivered to SIT/UAT/EUT": 36,  "Missed/In Progress": 14 }, Q3: { "Delivered to SIT/UAT/EUT": 39,  "Missed/In Progress": 14 }, Q4: { "Delivered to SIT/UAT/EUT": 33,  "Missed/In Progress": 15 } },
  Business:   { Q1: { "Delivered to SIT/UAT/EUT": 23, "Missed/In Progress": 17 }, Q2: { "Delivered to SIT/UAT/EUT": 27,  "Missed/In Progress": 18 }, Q3: { "Delivered to SIT/UAT/EUT": 30,  "Missed/In Progress": 17 }, Q4: { "Delivered to SIT/UAT/EUT": 25,  "Missed/In Progress": 20 } },
  Finance:    { Q1: { "Delivered to SIT/UAT/EUT": 10, "Missed/In Progress": 7  }, Q2: { "Delivered to SIT/UAT/EUT": 12,  "Missed/In Progress": 8  }, Q3: { "Delivered to SIT/UAT/EUT": 13,  "Missed/In Progress": 8  }, Q4: { "Delivered to SIT/UAT/EUT": 11,  "Missed/In Progress": 9  } },
  Technology: { Q1: { "Delivered to SIT/UAT/EUT": 7,  "Missed/In Progress": 4  }, Q2: { "Delivered to SIT/UAT/EUT": 8,   "Missed/In Progress": 5  }, Q3: { "Delivered to SIT/UAT/EUT": 9,   "Missed/In Progress": 5  }, Q4: { "Delivered to SIT/UAT/EUT": 8,   "Missed/In Progress": 5  } },
  Others:     { Q1: { "Delivered to SIT/UAT/EUT": 6,  "Missed/In Progress": 4  }, Q2: { "Delivered to SIT/UAT/EUT": 7,   "Missed/In Progress": 3  }, Q3: { "Delivered to SIT/UAT/EUT": 6,   "Missed/In Progress": 4  }, Q4: { "Delivered to SIT/UAT/EUT": 6,   "Missed/In Progress": 5  } },
};
const JIRA_DEL_UAT = {
  All:        { Q1: { "Delivered to RFS/Live": 62, "Missed/In Progress": 44 }, Q2: { "Delivered to RFS/Live": 76,  "Missed/In Progress": 49 }, Q3: { "Delivered to RFS/Live": 84,  "Missed/In Progress": 49 }, Q4: { "Delivered to RFS/Live": 70,  "Missed/In Progress": 56 } },
  Consumer:   { Q1: { "Delivered to RFS/Live": 24, "Missed/In Progress": 16 }, Q2: { "Delivered to RFS/Live": 30,  "Missed/In Progress": 20 }, Q3: { "Delivered to RFS/Live": 33,  "Missed/In Progress": 20 }, Q4: { "Delivered to RFS/Live": 27,  "Missed/In Progress": 21 } },
  Business:   { Q1: { "Delivered to RFS/Live": 19, "Missed/In Progress": 21 }, Q2: { "Delivered to RFS/Live": 23,  "Missed/In Progress": 22 }, Q3: { "Delivered to RFS/Live": 26,  "Missed/In Progress": 21 }, Q4: { "Delivered to RFS/Live": 21,  "Missed/In Progress": 24 } },
  Finance:    { Q1: { "Delivered to RFS/Live": 8,  "Missed/In Progress": 9  }, Q2: { "Delivered to RFS/Live": 10,  "Missed/In Progress": 10 }, Q3: { "Delivered to RFS/Live": 11,  "Missed/In Progress": 10 }, Q4: { "Delivered to RFS/Live": 9,   "Missed/In Progress": 11 } },
  Technology: { Q1: { "Delivered to RFS/Live": 5,  "Missed/In Progress": 6  }, Q2: { "Delivered to RFS/Live": 7,   "Missed/In Progress": 6  }, Q3: { "Delivered to RFS/Live": 7,   "Missed/In Progress": 7  }, Q4: { "Delivered to RFS/Live": 6,   "Missed/In Progress": 7  } },
  Others:     { Q1: { "Delivered to RFS/Live": 6,  "Missed/In Progress": 4  }, Q2: { "Delivered to RFS/Live": 6,   "Missed/In Progress": 4  }, Q3: { "Delivered to RFS/Live": 7,   "Missed/In Progress": 4  }, Q4: { "Delivered to RFS/Live": 7,   "Missed/In Progress": 5  } },
};

const JIRA_VENDOR = {
  All:        { Q1: { TCS: 38, TechM: 29, "Ooredoo Team": 22 }, Q2: { TCS: 44, TechM: 33, "Ooredoo Team": 26 }, Q3: { TCS: 51, TechM: 38, "Ooredoo Team": 31 }, Q4: { TCS: 46, TechM: 35, "Ooredoo Team": 28 } },
  Consumer:   { Q1: { TCS: 16, TechM: 10, "Ooredoo Team": 8  }, Q2: { TCS: 19, TechM: 13, "Ooredoo Team": 10 }, Q3: { TCS: 22, TechM: 15, "Ooredoo Team": 11 }, Q4: { TCS: 18, TechM: 12, "Ooredoo Team": 9  } },
  Business:   { Q1: { TCS: 12, TechM: 11, "Ooredoo Team": 7  }, Q2: { TCS: 14, TechM: 12, "Ooredoo Team": 9  }, Q3: { TCS: 17, TechM: 14, "Ooredoo Team": 11 }, Q4: { TCS: 15, TechM: 13, "Ooredoo Team": 10 } },
  Finance:    { Q1: { TCS: 4,  TechM: 3,  "Ooredoo Team": 3  }, Q2: { TCS: 5,  TechM: 4,  "Ooredoo Team": 3  }, Q3: { TCS: 5,  TechM: 4,  "Ooredoo Team": 4  }, Q4: { TCS: 6,  TechM: 4,  "Ooredoo Team": 3  } },
  Technology: { Q1: { TCS: 3,  TechM: 3,  "Ooredoo Team": 2  }, Q2: { TCS: 3,  TechM: 2,  "Ooredoo Team": 3  }, Q3: { TCS: 4,  TechM: 3,  "Ooredoo Team": 3  }, Q4: { TCS: 4,  TechM: 4,  "Ooredoo Team": 4  } },
  Others:     { Q1: { TCS: 3,  TechM: 2,  "Ooredoo Team": 2  }, Q2: { TCS: 3,  TechM: 2,  "Ooredoo Team": 1  }, Q3: { TCS: 3,  TechM: 2,  "Ooredoo Team": 2  }, Q4: { TCS: 3,  TechM: 2,  "Ooredoo Team": 2  } },
};

/* Vendor UAT delivery — delivered vs missed per vendor, keyed by BU then Quarter */
const JIRA_VENDOR_UAT = {
  All:        { Q1: { TCS: { "Delivered to UAT": 26, "Missed/In Progress": 12 }, TechM: { "Delivered to UAT": 19, "Missed/In Progress": 10 }, "Ooredoo Team": { "Delivered to UAT": 14, "Missed/In Progress": 8  } },
                Q2: { TCS: { "Delivered to UAT": 31, "Missed/In Progress": 13 }, TechM: { "Delivered to UAT": 22, "Missed/In Progress": 11 }, "Ooredoo Team": { "Delivered to UAT": 17, "Missed/In Progress": 9  } },
                Q3: { TCS: { "Delivered to UAT": 36, "Missed/In Progress": 15 }, TechM: { "Delivered to UAT": 26, "Missed/In Progress": 12 }, "Ooredoo Team": { "Delivered to UAT": 20, "Missed/In Progress": 11 } },
                Q4: { TCS: { "Delivered to UAT": 32, "Missed/In Progress": 14 }, TechM: { "Delivered to UAT": 24, "Missed/In Progress": 11 }, "Ooredoo Team": { "Delivered to UAT": 18, "Missed/In Progress": 10 } } },
  Consumer:   { Q1: { TCS: { "Delivered to UAT": 11, "Missed/In Progress": 5  }, TechM: { "Delivered to UAT": 7,  "Missed/In Progress": 3  }, "Ooredoo Team": { "Delivered to UAT": 5,  "Missed/In Progress": 3  } },
                Q2: { TCS: { "Delivered to UAT": 13, "Missed/In Progress": 6  }, TechM: { "Delivered to UAT": 9,  "Missed/In Progress": 4  }, "Ooredoo Team": { "Delivered to UAT": 7,  "Missed/In Progress": 3  } },
                Q3: { TCS: { "Delivered to UAT": 15, "Missed/In Progress": 7  }, TechM: { "Delivered to UAT": 10, "Missed/In Progress": 5  }, "Ooredoo Team": { "Delivered to UAT": 8,  "Missed/In Progress": 3  } },
                Q4: { TCS: { "Delivered to UAT": 12, "Missed/In Progress": 6  }, TechM: { "Delivered to UAT": 8,  "Missed/In Progress": 4  }, "Ooredoo Team": { "Delivered to UAT": 6,  "Missed/In Progress": 3  } } },
  Business:   { Q1: { TCS: { "Delivered to UAT": 8,  "Missed/In Progress": 4  }, TechM: { "Delivered to UAT": 7,  "Missed/In Progress": 4  }, "Ooredoo Team": { "Delivered to UAT": 5,  "Missed/In Progress": 2  } },
                Q2: { TCS: { "Delivered to UAT": 9,  "Missed/In Progress": 5  }, TechM: { "Delivered to UAT": 8,  "Missed/In Progress": 4  }, "Ooredoo Team": { "Delivered to UAT": 6,  "Missed/In Progress": 3  } },
                Q3: { TCS: { "Delivered to UAT": 11, "Missed/In Progress": 6  }, TechM: { "Delivered to UAT": 9,  "Missed/In Progress": 5  }, "Ooredoo Team": { "Delivered to UAT": 7,  "Missed/In Progress": 4  } },
                Q4: { TCS: { "Delivered to UAT": 10, "Missed/In Progress": 5  }, TechM: { "Delivered to UAT": 8,  "Missed/In Progress": 5  }, "Ooredoo Team": { "Delivered to UAT": 6,  "Missed/In Progress": 4  } } },
  Finance:    { Q1: { TCS: { "Delivered to UAT": 3,  "Missed/In Progress": 1  }, TechM: { "Delivered to UAT": 2,  "Missed/In Progress": 1  }, "Ooredoo Team": { "Delivered to UAT": 2,  "Missed/In Progress": 1  } },
                Q2: { TCS: { "Delivered to UAT": 3,  "Missed/In Progress": 2  }, TechM: { "Delivered to UAT": 2,  "Missed/In Progress": 2  }, "Ooredoo Team": { "Delivered to UAT": 2,  "Missed/In Progress": 1  } },
                Q3: { TCS: { "Delivered to UAT": 4,  "Missed/In Progress": 1  }, TechM: { "Delivered to UAT": 3,  "Missed/In Progress": 1  }, "Ooredoo Team": { "Delivered to UAT": 2,  "Missed/In Progress": 2  } },
                Q4: { TCS: { "Delivered to UAT": 4,  "Missed/In Progress": 2  }, TechM: { "Delivered to UAT": 3,  "Missed/In Progress": 1  }, "Ooredoo Team": { "Delivered to UAT": 2,  "Missed/In Progress": 1  } } },
  Technology: { Q1: { TCS: { "Delivered to UAT": 2,  "Missed/In Progress": 1  }, TechM: { "Delivered to UAT": 2,  "Missed/In Progress": 1  }, "Ooredoo Team": { "Delivered to UAT": 1,  "Missed/In Progress": 1  } },
                Q2: { TCS: { "Delivered to UAT": 2,  "Missed/In Progress": 1  }, TechM: { "Delivered to UAT": 1,  "Missed/In Progress": 1  }, "Ooredoo Team": { "Delivered to UAT": 2,  "Missed/In Progress": 1  } },
                Q3: { TCS: { "Delivered to UAT": 3,  "Missed/In Progress": 1  }, TechM: { "Delivered to UAT": 2,  "Missed/In Progress": 1  }, "Ooredoo Team": { "Delivered to UAT": 2,  "Missed/In Progress": 1  } },
                Q4: { TCS: { "Delivered to UAT": 3,  "Missed/In Progress": 1  }, TechM: { "Delivered to UAT": 2,  "Missed/In Progress": 2  }, "Ooredoo Team": { "Delivered to UAT": 2,  "Missed/In Progress": 2  } } },
  Others:     { Q1: { TCS: { "Delivered to UAT": 2,  "Missed/In Progress": 1  }, TechM: { "Delivered to UAT": 1,  "Missed/In Progress": 1  }, "Ooredoo Team": { "Delivered to UAT": 1,  "Missed/In Progress": 1  } },
                Q2: { TCS: { "Delivered to UAT": 4,  "Missed/In Progress": 1  }, TechM: { "Delivered to UAT": 2,  "Missed/In Progress": 1  }, "Ooredoo Team": { "Delivered to UAT": 0,  "Missed/In Progress": 1  } },
                Q3: { TCS: { "Delivered to UAT": 3,  "Missed/In Progress": 1  }, TechM: { "Delivered to UAT": 2,  "Missed/In Progress": 1  }, "Ooredoo Team": { "Delivered to UAT": 1,  "Missed/In Progress": 1  } },
                Q4: { TCS: { "Delivered to UAT": 3,  "Missed/In Progress": 1  }, TechM: { "Delivered to UAT": 3,  "Missed/In Progress": 1  }, "Ooredoo Team": { "Delivered to UAT": 2,  "Missed/In Progress": 1  } } },
};

/* ── Individual DRF Records (for search) ── */
const JIRA_DRFS = [
  { id:"OQ-1", desc:"Customer portal UI refresh",              bu:"Consumer",   q:"Q1", val:"Customer Experience",    dDemand:"Delivered to SD",    dSD:"Completed SD",             dDev:"Delivered to SIT/UAT/EUT", dSIT:"Delivered to UAT",    dUAT:"Delivered to RFS/Live",  rej:"Accepted",        vendor:"TCS",          stage:"RFS/Live",    days:3  },
  { id:"OQ-2", desc:"Mobile app onboarding redesign",          bu:"Consumer",   q:"Q1", val:"Customer Experience",    dDemand:"Delivered to SD",    dSD:"Missed/In Progress",       dDev:"Missed/In Progress",       dSIT:"Missed/In Progress",  dUAT:"Missed/In Progress",     rej:"Accepted",        vendor:"TechM",        stage:"SD",          days:17 },
  { id:"OQ-3", desc:"Loyalty rewards engine upgrade",          bu:"Consumer",   q:"Q2", val:"Efficiency",             dDemand:"Delivered to SD",    dSD:"Completed SD",             dDev:"Delivered to SIT/UAT/EUT", dSIT:"Delivered to UAT",    dUAT:"Missed/In Progress",     rej:"Accepted",        vendor:"TCS",          stage:"UAT",         days:9  },
  { id:"OQ-4", desc:"Self-service billing portal",             bu:"Consumer",   q:"Q2", val:"Customer Experience",    dDemand:"Missed/In Progress", dSD:"Missed/In Progress",       dDev:"Missed/In Progress",       dSIT:"Missed/In Progress",  dUAT:"Missed/In Progress",     rej:"Back to demand",  vendor:"Ooredoo Team", stage:"Demand",      days:12 },
  { id:"OQ-5", desc:"AI chatbot for customer support",         bu:"Consumer",   q:"Q3", val:"Technology Advancement", dDemand:"Delivered to SD",    dSD:"Completed SD",             dDev:"Delivered to SIT/UAT/EUT", dSIT:"Delivered to UAT",    dUAT:"Delivered to RFS/Live",  rej:"Accepted",        vendor:"TCS",          stage:"RFS/Live",    days:2  },
  { id:"OQ-6", desc:"Prepaid data bundle configurator",        bu:"Consumer",   q:"Q3", val:"Customer Experience",    dDemand:"Delivered to SD",    dSD:"Missed/In Progress",       dDev:"Missed/In Progress",       dSIT:"Missed/In Progress",  dUAT:"Missed/In Progress",     rej:"Accepted",        vendor:"TechM",        stage:"Development", days:26 },
  { id:"OQ-7", desc:"e-KYC digital onboarding flow",           bu:"Consumer",   q:"Q4", val:"Efficiency",             dDemand:"Delivered to SD",    dSD:"Completed SD",             dDev:"Delivered to SIT/UAT/EUT", dSIT:"Missed/In Progress",  dUAT:"Missed/In Progress",     rej:"Accepted",        vendor:"TCS",          stage:"SIT",         days:11 },
  { id:"OQ-8", desc:"Roaming package comparison tool",         bu:"Consumer",   q:"Q4", val:"Customer Experience",    dDemand:"Missed/In Progress", dSD:"Missed/In Progress",       dDev:"Missed/In Progress",       dSIT:"Missed/In Progress",  dUAT:"Missed/In Progress",     rej:"Back to demand",  vendor:"Ooredoo Team", stage:"BU",          days:5  },
  { id:"OQ-9", desc:"B2B contract renewal automation",         bu:"Business",   q:"Q1", val:"Efficiency",             dDemand:"Delivered to SD",    dSD:"Completed SD",             dDev:"Delivered to SIT/UAT/EUT", dSIT:"Delivered to UAT",    dUAT:"Delivered to RFS/Live",  rej:"Accepted",        vendor:"TechM",        stage:"RFS/Live",    days:4  },
  { id:"OQ-10", desc:"Enterprise SLA dashboard",                bu:"Business",   q:"Q1", val:"Customer Experience",    dDemand:"Delivered to SD",    dSD:"Missed/In Progress",       dDev:"Missed/In Progress",       dSIT:"Missed/In Progress",  dUAT:"Missed/In Progress",     rej:"Accepted",        vendor:"TCS",          stage:"SD",          days:15 },
  { id:"OQ-11", desc:"Bulk SMS campaign manager",               bu:"Business",   q:"Q2", val:"Efficiency",             dDemand:"Delivered to SD",    dSD:"Completed SD",             dDev:"Delivered to SIT/UAT/EUT", dSIT:"Delivered to UAT",    dUAT:"Missed/In Progress",     rej:"Accepted",        vendor:"TechM",        stage:"UAT",         days:8  },
  { id:"OQ-12", desc:"IoT device fleet management",             bu:"Business",   q:"Q2", val:"Technology Advancement", dDemand:"Missed/In Progress", dSD:"Missed/In Progress",       dDev:"Missed/In Progress",       dSIT:"Missed/In Progress",  dUAT:"Missed/In Progress",     rej:"Back to demand",  vendor:"Ooredoo Team", stage:"Demand",      days:14 },
  { id:"OQ-13", desc:"Corporate data plan self-service",        bu:"Business",   q:"Q3", val:"Customer Experience",    dDemand:"Delivered to SD",    dSD:"Completed SD",             dDev:"Delivered to SIT/UAT/EUT", dSIT:"Delivered to UAT",    dUAT:"Delivered to RFS/Live",  rej:"Accepted",        vendor:"TCS",          stage:"RFS/Live",    days:3  },
  { id:"OQ-14", desc:"API gateway for partner integrations",    bu:"Business",   q:"Q3", val:"Technology Advancement", dDemand:"Delivered to SD",    dSD:"Missed/In Progress",       dDev:"Missed/In Progress",       dSIT:"Missed/In Progress",  dUAT:"Missed/In Progress",     rej:"Accepted",        vendor:"TechM",        stage:"Development", days:29 },
  { id:"OQ-15", desc:"Multi-tenant billing engine",             bu:"Business",   q:"Q4", val:"Efficiency",             dDemand:"Delivered to SD",    dSD:"Completed SD",             dDev:"Missed/In Progress",       dSIT:"Missed/In Progress",  dUAT:"Missed/In Progress",     rej:"Accepted",        vendor:"TCS",          stage:"Development", days:22 },
  { id:"OQ-16", desc:"Partner portal revamp",                   bu:"Business",   q:"Q4", val:"Customer Experience",    dDemand:"Missed/In Progress", dSD:"Missed/In Progress",       dDev:"Missed/In Progress",       dSIT:"Missed/In Progress",  dUAT:"Missed/In Progress",     rej:"Back to demand",  vendor:"Ooredoo Team", stage:"BU",          days:6  },
  { id:"OQ-17", desc:"Revenue assurance automation",            bu:"Finance",    q:"Q1", val:"Efficiency",             dDemand:"Delivered to SD",    dSD:"Completed SD",             dDev:"Delivered to SIT/UAT/EUT", dSIT:"Delivered to UAT",    dUAT:"Delivered to RFS/Live",  rej:"Accepted",        vendor:"TCS",          stage:"RFS/Live",    days:2  },
  { id:"OQ-18", desc:"Invoice reconciliation tool",             bu:"Finance",    q:"Q1", val:"Efficiency",             dDemand:"Delivered to SD",    dSD:"Missed/In Progress",       dDev:"Missed/In Progress",       dSIT:"Missed/In Progress",  dUAT:"Missed/In Progress",     rej:"Accepted",        vendor:"TechM",        stage:"SD",          days:13 },
  { id:"OQ-19", desc:"Budget forecasting module",               bu:"Finance",    q:"Q2", val:"Technology Advancement", dDemand:"Delivered to SD",    dSD:"Completed SD",             dDev:"Delivered to SIT/UAT/EUT", dSIT:"Missed/In Progress",  dUAT:"Missed/In Progress",     rej:"Accepted",        vendor:"TCS",          stage:"SIT",         days:10 },
  { id:"OQ-20", desc:"Tax compliance reporting engine",         bu:"Finance",    q:"Q3", val:"Efficiency",             dDemand:"Delivered to SD",    dSD:"Completed SD",             dDev:"Delivered to SIT/UAT/EUT", dSIT:"Delivered to UAT",    dUAT:"Missed/In Progress",     rej:"Accepted",        vendor:"Ooredoo Team", stage:"UAT",         days:7  },
  { id:"OQ-21", desc:"Cost centre allocation dashboard",        bu:"Finance",    q:"Q3", val:"Efficiency",             dDemand:"Missed/In Progress", dSD:"Missed/In Progress",       dDev:"Missed/In Progress",       dSIT:"Missed/In Progress",  dUAT:"Missed/In Progress",     rej:"Back to demand",  vendor:"TechM",        stage:"Demand",      days:11 },
  { id:"OQ-22", desc:"Procurement approval workflow",           bu:"Finance",    q:"Q4", val:"Efficiency",             dDemand:"Delivered to SD",    dSD:"Completed SD",             dDev:"Delivered to SIT/UAT/EUT", dSIT:"Delivered to UAT",    dUAT:"Delivered to RFS/Live",  rej:"Accepted",        vendor:"TCS",          stage:"RFS/Live",    days:3  },
  { id:"OQ-23", desc:"5G network slice management console",     bu:"Technology", q:"Q1", val:"Technology Advancement", dDemand:"Delivered to SD",    dSD:"Completed SD",             dDev:"Delivered to SIT/UAT/EUT", dSIT:"Delivered to UAT",    dUAT:"Delivered to RFS/Live",  rej:"Accepted",        vendor:"TCS",          stage:"RFS/Live",    days:4  },
  { id:"OQ-24", desc:"Network capacity planning tool",          bu:"Technology", q:"Q2", val:"Technology Advancement", dDemand:"Delivered to SD",    dSD:"Missed/In Progress",       dDev:"Missed/In Progress",       dSIT:"Missed/In Progress",  dUAT:"Missed/In Progress",     rej:"Accepted",        vendor:"TechM",        stage:"SD",          days:16 },
  { id:"OQ-25", desc:"Cloud migration orchestration platform",  bu:"Technology", q:"Q2", val:"Technology Advancement", dDemand:"Delivered to SD",    dSD:"Completed SD",             dDev:"Missed/In Progress",       dSIT:"Missed/In Progress",  dUAT:"Missed/In Progress",     rej:"Accepted",        vendor:"TCS",          stage:"Development", days:24 },
  { id:"OQ-26", desc:"DevSecOps pipeline automation",           bu:"Technology", q:"Q3", val:"Technology Advancement", dDemand:"Delivered to SD",    dSD:"Completed SD",             dDev:"Delivered to SIT/UAT/EUT", dSIT:"Missed/In Progress",  dUAT:"Missed/In Progress",     rej:"Accepted",        vendor:"Ooredoo Team", stage:"SIT",         days:12 },
  { id:"OQ-27", desc:"AI-driven network fault detection",       bu:"Technology", q:"Q4", val:"Technology Advancement", dDemand:"Missed/In Progress", dSD:"Missed/In Progress",       dDev:"Missed/In Progress",       dSIT:"Missed/In Progress",  dUAT:"Missed/In Progress",     rej:"Back to demand",  vendor:"TechM",        stage:"BU",          days:5  },
  { id:"OQ-28", desc:"OSS/BSS integration middleware",          bu:"Technology", q:"Q4", val:"Technology Advancement", dDemand:"Delivered to SD",    dSD:"Completed SD",             dDev:"Delivered to SIT/UAT/EUT", dSIT:"Delivered to UAT",    dUAT:"Missed/In Progress",     rej:"Accepted",        vendor:"TCS",          stage:"UAT",         days:9  },
  { id:"OQ-29", desc:"Internal ticketing system upgrade",       bu:"Others",     q:"Q1", val:"Efficiency",             dDemand:"Delivered to SD",    dSD:"Completed SD",             dDev:"Delivered to SIT/UAT/EUT", dSIT:"Delivered to UAT",    dUAT:"Delivered to RFS/Live",  rej:"Accepted",        vendor:"TechM",        stage:"RFS/Live",    days:2  },
  { id:"OQ-30", desc:"HR self-service module",                  bu:"Others",     q:"Q1", val:"Efficiency",             dDemand:"Missed/In Progress", dSD:"Missed/In Progress",       dDev:"Missed/In Progress",       dSIT:"Missed/In Progress",  dUAT:"Missed/In Progress",     rej:"Back to demand",  vendor:"Ooredoo Team", stage:"Demand",      days:9  },
  { id:"OQ-31", desc:"Internal knowledge base platform",        bu:"Others",     q:"Q2", val:"Efficiency",             dDemand:"Delivered to SD",    dSD:"Completed SD",             dDev:"Missed/In Progress",       dSIT:"Missed/In Progress",  dUAT:"Missed/In Progress",     rej:"Accepted",        vendor:"TCS",          stage:"Development", days:20 },
  { id:"OQ-32", desc:"Facilities management portal",            bu:"Others",     q:"Q3", val:"Customer Experience",    dDemand:"Delivered to SD",    dSD:"Missed/In Progress",       dDev:"Missed/In Progress",       dSIT:"Missed/In Progress",  dUAT:"Missed/In Progress",     rej:"Accepted",        vendor:"TechM",        stage:"SD",          days:14 },
  { id:"OQ-33", desc:"Vendor performance scorecard",            bu:"Others",     q:"Q4", val:"Efficiency",             dDemand:"Delivered to SD",    dSD:"Completed SD",             dDev:"Delivered to SIT/UAT/EUT", dSIT:"Delivered to UAT",    dUAT:"Delivered to RFS/Live",  rej:"Accepted",        vendor:"TCS",          stage:"RFS/Live",    days:3  },
  { id:"OQ-34", desc:"Customer NPS tracking system",            bu:"Consumer",   q:"Q1", val:"Customer Experience",    dDemand:"Delivered to SD",    dSD:"Completed SD",             dDev:"Delivered to SIT/UAT/EUT", dSIT:"Missed/In Progress",  dUAT:"Missed/In Progress",     rej:"Accepted",        vendor:"TCS",          stage:"SIT",         days:10 },
  { id:"OQ-35", desc:"eSIM provisioning platform",              bu:"Consumer",   q:"Q2", val:"Technology Advancement", dDemand:"Delivered to SD",    dSD:"Completed SD",             dDev:"Delivered to SIT/UAT/EUT", dSIT:"Delivered to UAT",    dUAT:"Delivered to RFS/Live",  rej:"Accepted",        vendor:"TechM",        stage:"RFS/Live",    days:2  },
  { id:"OQ-36", desc:"Fixed broadband fault tracker",           bu:"Business",   q:"Q3", val:"Customer Experience",    dDemand:"Delivered to SD",    dSD:"Missed/In Progress",       dDev:"Missed/In Progress",       dSIT:"Missed/In Progress",  dUAT:"Missed/In Progress",     rej:"Accepted",        vendor:"TCS",          stage:"Development", days:25 },
  { id:"OQ-37", desc:"Treasury management integration",         bu:"Finance",    q:"Q2", val:"Efficiency",             dDemand:"Delivered to SD",    dSD:"Completed SD",             dDev:"Delivered to SIT/UAT/EUT", dSIT:"Delivered to UAT",    dUAT:"Delivered to RFS/Live",  rej:"Accepted",        vendor:"TCS",          stage:"RFS/Live",    days:4  },
  { id:"OQ-38", desc:"SDN controller upgrade",                  bu:"Technology", q:"Q1", val:"Technology Advancement", dDemand:"Delivered to SD",    dSD:"Completed SD",             dDev:"Missed/In Progress",       dSIT:"Missed/In Progress",  dUAT:"Missed/In Progress",     rej:"Accepted",        vendor:"Ooredoo Team", stage:"Development", days:23 },
  { id:"OQ-39", desc:"Employee expense reimbursement app",      bu:"Others",     q:"Q3", val:"Efficiency",             dDemand:"Delivered to SD",    dSD:"Completed SD",             dDev:"Delivered to SIT/UAT/EUT", dSIT:"Delivered to UAT",    dUAT:"Missed/In Progress",     rej:"Accepted",        vendor:"TechM",        stage:"UAT",         days:8  },
  { id:"OQ-40", desc:"MVNO management portal",                  bu:"Business",   q:"Q4", val:"Customer Experience",    dDemand:"Delivered to SD",    dSD:"Completed SD",             dDev:"Delivered to SIT/UAT/EUT", dSIT:"Delivered to UAT",    dUAT:"Delivered to RFS/Live",  rej:"Accepted",        vendor:"TCS",          stage:"RFS/Live",    days:3  },
  { id:"OQ-41", desc:"Wholesale interconnect billing",          bu:"Finance",    q:"Q1", val:"Efficiency",             dDemand:"Delivered to SD",    dSD:"Missed/In Progress",       dDev:"Missed/In Progress",       dSIT:"Missed/In Progress",  dUAT:"Missed/In Progress",     rej:"Accepted",        vendor:"TechM",        stage:"SD",          days:18 },
  { id:"OQ-42", desc:"Retail POS integration",                  bu:"Consumer",   q:"Q4", val:"Customer Experience",    dDemand:"Delivered to SD",    dSD:"Completed SD",             dDev:"Delivered to SIT/UAT/EUT", dSIT:"Delivered to UAT",    dUAT:"Missed/In Progress",     rej:"Accepted",        vendor:"Ooredoo Team", stage:"UAT",         days:7  },
  { id:"OQ-43", desc:"Cloud storage tiering automation",        bu:"Technology", q:"Q3", val:"Technology Advancement", dDemand:"Delivered to SD",    dSD:"Completed SD",             dDev:"Delivered to SIT/UAT/EUT", dSIT:"Delivered to UAT",    dUAT:"Delivered to RFS/Live",  rej:"Accepted",        vendor:"TCS",          stage:"RFS/Live",    days:2  },
  { id:"OQ-44", desc:"Contact centre IVR modernisation",        bu:"Business",   q:"Q2", val:"Customer Experience",    dDemand:"Delivered to SD",    dSD:"Completed SD",             dDev:"Delivered to SIT/UAT/EUT", dSIT:"Delivered to UAT",    dUAT:"Delivered to RFS/Live",  rej:"Accepted",        vendor:"TechM",        stage:"RFS/Live",    days:3  },
  { id:"OQ-45", desc:"Compliance audit trail system",           bu:"Finance",    q:"Q4", val:"Efficiency",             dDemand:"Missed/In Progress", dSD:"Missed/In Progress",       dDev:"Missed/In Progress",       dSIT:"Missed/In Progress",  dUAT:"Missed/In Progress",     rej:"Back to demand",  vendor:"Ooredoo Team", stage:"Demand",      days:10 },
  { id:"OQ-46", desc:"Inventory management system upgrade",     bu:"Others",     q:"Q4", val:"Efficiency",             dDemand:"Delivered to SD",    dSD:"Missed/In Progress",       dDev:"Missed/In Progress",       dSIT:"Missed/In Progress",  dUAT:"Missed/In Progress",     rej:"Accepted",        vendor:"TCS",          stage:"SD",          days:15 },
  { id:"OQ-47", desc:"Data lake for analytics platform",        bu:"Technology", q:"Q2", val:"Technology Advancement", dDemand:"Delivered to SD",    dSD:"Completed SD",             dDev:"Missed/In Progress",       dSIT:"Missed/In Progress",  dUAT:"Missed/In Progress",     rej:"Accepted",        vendor:"TCS",          stage:"Development", days:27 },
  { id:"OQ-48", desc:"Omnichannel notification hub",            bu:"Consumer",   q:"Q2", val:"Customer Experience",    dDemand:"Delivered to SD",    dSD:"Completed SD",             dDev:"Delivered to SIT/UAT/EUT", dSIT:"Delivered to UAT",    dUAT:"Delivered to RFS/Live",  rej:"Accepted",        vendor:"TechM",        stage:"RFS/Live",    days:2  },
  { id:"OQ-49", desc:"Carrier billing gateway",                 bu:"Business",   q:"Q1", val:"Efficiency",             dDemand:"Delivered to SD",    dSD:"Completed SD",             dDev:"Delivered to SIT/UAT/EUT", dSIT:"Missed/In Progress",  dUAT:"Missed/In Progress",     rej:"Accepted",        vendor:"TCS",          stage:"SIT",         days:13 },
  { id:"OQ-50", desc:"Real-time fraud detection engine",        bu:"Finance",    q:"Q3", val:"Technology Advancement", dDemand:"Delivered to SD",    dSD:"Completed SD",             dDev:"Delivered to SIT/UAT/EUT", dSIT:"Delivered to UAT",    dUAT:"Delivered to RFS/Live",  rej:"Accepted",        vendor:"TCS",          stage:"RFS/Live",    days:3  },
];
const JIRA_AGING = {
  All:        { Q1: { BU: { count: 42, avgDays: 4  }, Demand: { count: 38, avgDays: 9  }, SD: { count: 31, avgDays: 14 }, Development: { count: 27, avgDays: 22 }, SIT: { count: 19, avgDays: 11 }, UAT: { count: 14, avgDays: 8  }, "RFS/Live": { count: 9,  avgDays: 3  } },
                Q2: { BU: { count: 50, avgDays: 5  }, Demand: { count: 45, avgDays: 10 }, SD: { count: 37, avgDays: 15 }, Development: { count: 32, avgDays: 24 }, SIT: { count: 22, avgDays: 12 }, UAT: { count: 17, avgDays: 9  }, "RFS/Live": { count: 11, avgDays: 3  } },
                Q3: { BU: { count: 55, avgDays: 5  }, Demand: { count: 49, avgDays: 11 }, SD: { count: 41, avgDays: 16 }, Development: { count: 35, avgDays: 25 }, SIT: { count: 25, avgDays: 13 }, UAT: { count: 19, avgDays: 10 }, "RFS/Live": { count: 13, avgDays: 4  } },
                Q4: { BU: { count: 48, avgDays: 5  }, Demand: { count: 43, avgDays: 10 }, SD: { count: 36, avgDays: 15 }, Development: { count: 30, avgDays: 23 }, SIT: { count: 21, avgDays: 12 }, UAT: { count: 16, avgDays: 9  }, "RFS/Live": { count: 10, avgDays: 3  } } },
  Consumer:   { Q1: { BU: { count: 16, avgDays: 3  }, Demand: { count: 14, avgDays: 8  }, SD: { count: 12, avgDays: 13 }, Development: { count: 10, avgDays: 21 }, SIT: { count: 7,  avgDays: 10 }, UAT: { count: 5,  avgDays: 7  }, "RFS/Live": { count: 3,  avgDays: 2  } },
                Q2: { BU: { count: 19, avgDays: 4  }, Demand: { count: 17, avgDays: 9  }, SD: { count: 14, avgDays: 14 }, Development: { count: 12, avgDays: 22 }, SIT: { count: 8,  avgDays: 11 }, UAT: { count: 6,  avgDays: 8  }, "RFS/Live": { count: 4,  avgDays: 2  } },
                Q3: { BU: { count: 21, avgDays: 4  }, Demand: { count: 19, avgDays: 10 }, SD: { count: 16, avgDays: 15 }, Development: { count: 13, avgDays: 23 }, SIT: { count: 9,  avgDays: 12 }, UAT: { count: 7,  avgDays: 9  }, "RFS/Live": { count: 5,  avgDays: 3  } },
                Q4: { BU: { count: 18, avgDays: 4  }, Demand: { count: 16, avgDays: 9  }, SD: { count: 13, avgDays: 14 }, Development: { count: 11, avgDays: 22 }, SIT: { count: 8,  avgDays: 11 }, UAT: { count: 6,  avgDays: 8  }, "RFS/Live": { count: 4,  avgDays: 2  } } },
  Business:   { Q1: { BU: { count: 12, avgDays: 4  }, Demand: { count: 11, avgDays: 9  }, SD: { count: 9,  avgDays: 14 }, Development: { count: 8,  avgDays: 22 }, SIT: { count: 6,  avgDays: 11 }, UAT: { count: 4,  avgDays: 8  }, "RFS/Live": { count: 3,  avgDays: 3  } },
                Q2: { BU: { count: 14, avgDays: 5  }, Demand: { count: 13, avgDays: 10 }, SD: { count: 11, avgDays: 15 }, Development: { count: 9,  avgDays: 24 }, SIT: { count: 7,  avgDays: 12 }, UAT: { count: 5,  avgDays: 9  }, "RFS/Live": { count: 3,  avgDays: 3  } },
                Q3: { BU: { count: 16, avgDays: 5  }, Demand: { count: 14, avgDays: 11 }, SD: { count: 12, avgDays: 16 }, Development: { count: 10, avgDays: 25 }, SIT: { count: 7,  avgDays: 13 }, UAT: { count: 6,  avgDays: 10 }, "RFS/Live": { count: 4,  avgDays: 4  } },
                Q4: { BU: { count: 14, avgDays: 5  }, Demand: { count: 12, avgDays: 10 }, SD: { count: 10, avgDays: 15 }, Development: { count: 9,  avgDays: 23 }, SIT: { count: 6,  avgDays: 12 }, UAT: { count: 5,  avgDays: 9  }, "RFS/Live": { count: 3,  avgDays: 3  } } },
  Finance:    { Q1: { BU: { count: 7,  avgDays: 4  }, Demand: { count: 6,  avgDays: 9  }, SD: { count: 5,  avgDays: 13 }, Development: { count: 4,  avgDays: 21 }, SIT: { count: 3,  avgDays: 10 }, UAT: { count: 2,  avgDays: 7  }, "RFS/Live": { count: 1,  avgDays: 2  } },
                Q2: { BU: { count: 8,  avgDays: 5  }, Demand: { count: 7,  avgDays: 10 }, SD: { count: 6,  avgDays: 14 }, Development: { count: 5,  avgDays: 23 }, SIT: { count: 3,  avgDays: 11 }, UAT: { count: 2,  avgDays: 8  }, "RFS/Live": { count: 2,  avgDays: 3  } },
                Q3: { BU: { count: 9,  avgDays: 5  }, Demand: { count: 8,  avgDays: 10 }, SD: { count: 7,  avgDays: 15 }, Development: { count: 6,  avgDays: 24 }, SIT: { count: 4,  avgDays: 12 }, UAT: { count: 3,  avgDays: 9  }, "RFS/Live": { count: 2,  avgDays: 3  } },
                Q4: { BU: { count: 8,  avgDays: 5  }, Demand: { count: 7,  avgDays: 10 }, SD: { count: 6,  avgDays: 14 }, Development: { count: 5,  avgDays: 22 }, SIT: { count: 3,  avgDays: 11 }, UAT: { count: 2,  avgDays: 8  }, "RFS/Live": { count: 1,  avgDays: 2  } } },
  Technology: { Q1: { BU: { count: 5,  avgDays: 3  }, Demand: { count: 4,  avgDays: 8  }, SD: { count: 3,  avgDays: 12 }, Development: { count: 3,  avgDays: 20 }, SIT: { count: 2,  avgDays: 10 }, UAT: { count: 2,  avgDays: 7  }, "RFS/Live": { count: 1,  avgDays: 2  } },
                Q2: { BU: { count: 6,  avgDays: 4  }, Demand: { count: 5,  avgDays: 9  }, SD: { count: 4,  avgDays: 13 }, Development: { count: 3,  avgDays: 22 }, SIT: { count: 2,  avgDays: 11 }, UAT: { count: 2,  avgDays: 8  }, "RFS/Live": { count: 1,  avgDays: 2  } },
                Q3: { BU: { count: 6,  avgDays: 4  }, Demand: { count: 5,  avgDays: 10 }, SD: { count: 4,  avgDays: 14 }, Development: { count: 4,  avgDays: 23 }, SIT: { count: 3,  avgDays: 12 }, UAT: { count: 2,  avgDays: 9  }, "RFS/Live": { count: 1,  avgDays: 3  } },
                Q4: { BU: { count: 5,  avgDays: 4  }, Demand: { count: 5,  avgDays: 9  }, SD: { count: 4,  avgDays: 13 }, Development: { count: 3,  avgDays: 21 }, SIT: { count: 2,  avgDays: 11 }, UAT: { count: 2,  avgDays: 8  }, "RFS/Live": { count: 1,  avgDays: 2  } } },
  Others:     { Q1: { BU: { count: 4,  avgDays: 3  }, Demand: { count: 3,  avgDays: 8  }, SD: { count: 2,  avgDays: 12 }, Development: { count: 2,  avgDays: 19 }, SIT: { count: 1,  avgDays: 9  }, UAT: { count: 1,  avgDays: 6  }, "RFS/Live": { count: 1,  avgDays: 2  } },
                Q2: { BU: { count: 4,  avgDays: 4  }, Demand: { count: 3,  avgDays: 9  }, SD: { count: 2,  avgDays: 13 }, Development: { count: 2,  avgDays: 20 }, SIT: { count: 1,  avgDays: 10 }, UAT: { count: 1,  avgDays: 7  }, "RFS/Live": { count: 1,  avgDays: 2  } },
                Q3: { BU: { count: 4,  avgDays: 4  }, Demand: { count: 3,  avgDays: 9  }, SD: { count: 2,  avgDays: 13 }, Development: { count: 2,  avgDays: 21 }, SIT: { count: 2,  avgDays: 10 }, UAT: { count: 1,  avgDays: 7  }, "RFS/Live": { count: 1,  avgDays: 2  } },
                Q4: { BU: { count: 4,  avgDays: 4  }, Demand: { count: 3,  avgDays: 9  }, SD: { count: 2,  avgDays: 13 }, Development: { count: 2,  avgDays: 20 }, SIT: { count: 2,  avgDays: 10 }, UAT: { count: 1,  avgDays: 7  }, "RFS/Live": { count: 1,  avgDays: 2  } } },
};
const VALUE_COLORS    = { "Customer Experience": "#2563EB", "Efficiency": "#10B981", "Technology Advancement": "#F59E0B" };
const VALUE_ICONS     = { "Customer Experience": "👤", "Efficiency": "⚡", "Technology Advancement": "🔬" };
const DELIVERY_COLORS = { "Delivered to UAT": "#16A34A", "Missed/In Progress": "#EAB308" };
const DELIVERY_ICONS  = { "Delivered to UAT": "✅", "Missed/In Progress": "🔄" };
const SD_COLORS       = { "Completed SD": "#16A34A", "Missed/In Progress": "#EAB308" };
const SD_ICONS        = { "Completed SD": "✅", "Missed/In Progress": "🔄" };
const REJECTED_COLORS  = { "Accepted": "#16A34A", "Back to demand": "#EAB308" };
const REJECTED_ICONS   = { "Accepted": "✅", "Back to demand": "🔄" };
const DEL_DEMAND_COLORS = { "Delivered to SD": "#16A34A", "Missed/In Progress": "#EAB308" };
const DEL_DEMAND_ICONS  = { "Delivered to SD": "✅", "Missed/In Progress": "🔄" };
const DEL_DEV_COLORS    = { "Delivered to SIT/UAT/EUT": "#16A34A", "Missed/In Progress": "#EAB308" };
const DEL_DEV_ICONS     = { "Delivered to SIT/UAT/EUT": "✅", "Missed/In Progress": "🔄" };
const DEL_UAT_COLORS    = { "Delivered to RFS/Live": "#16A34A", "Missed/In Progress": "#EAB308" };
const DEL_UAT_ICONS     = { "Delivered to RFS/Live": "✅", "Missed/In Progress": "🔄" };
const VENDOR_COLORS   = { TCS: "#6366F1", TechM: "#EC4899", "Ooredoo Team": "#0EA5E9" };
const BU_COLORS       = { Consumer: "#2563EB", Business: "#10B981", Finance: "#F59E0B", Technology: "#EC4899", Others: "#8B5CF6" };
const BU_STACK_KEYS   = ["Consumer", "Business", "Finance", "Technology", "Others"];
const BUS             = ["All", "Consumer", "Business", "Finance", "Technology", "Others"];
const QUARTERS        = ["Q1", "Q2", "Q3", "Q4"];
const QUARTER_OPTIONS = ["All", "Q1", "Q2", "Q3", "Q4"];
const RADIAN          = Math.PI / 180;

/* ══════════════════════════════════════════
   RESPONSIVE HOOK
══════════════════════════════════════════ */
function useBreakpoint() {
  const [w, setW] = useState(typeof window !== "undefined" ? window.innerWidth : 1280);
  useEffect(() => {
    const fn = () => setW(window.innerWidth);
    window.addEventListener("resize", fn);
    return () => window.removeEventListener("resize", fn);
  }, []);
  return {
    isMobile:  w < 640,
    isTablet:  w >= 640 && w < 1024,
    isDesktop: w >= 1024,
    width: w,
  };
}

/* ══════════════════════════════════════════
   SLICE LABEL
══════════════════════════════════════════ */
const SliceLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, pct }) => {
  if (pct < 10) return null;
  const r = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + r * Math.cos(-midAngle * RADIAN);
  const y = cy + r * Math.sin(-midAngle * RADIAN);
  return (
    <text x={x} y={y} fill="#fff" textAnchor="middle" dominantBaseline="central"
      style={{ fontSize: 11, fontWeight: 700, fontFamily: "inherit" }}>
      {parseFloat(pct).toFixed(0)}%
    </text>
  );
};

/* ══════════════════════════════════════════
   TOOLTIP FACTORY
══════════════════════════════════════════ */
const makeTooltip = (colorMap) => ({ active, payload }) => {
  if (!active || !payload?.length) return null;
  const d = payload[0].payload;
  return (
    <div style={{ background: "#fff", border: "1px solid #F3F4F6", borderRadius: 8, padding: "9px 14px", boxShadow: "0 4px 20px rgba(0,0,0,0.09)", fontSize: 13, fontFamily: "inherit" }}>
      <div style={{ fontWeight: 700, color: "#111827", marginBottom: 3 }}>{d.name}</div>
      <div style={{ color: "#6B7280" }}>
        <span style={{ fontWeight: 600, color: colorMap[d.name] }}>{d.value} DRFs</span>
        &nbsp;·&nbsp;{d.pct}% of total
      </div>
    </div>
  );
};

const ValueTooltip      = makeTooltip(VALUE_COLORS);
const DeliveryTooltip   = makeTooltip(DELIVERY_COLORS);
const SDTooltip         = makeTooltip(SD_COLORS);
const RejectedTooltip   = makeTooltip(REJECTED_COLORS);
const DelDemandTooltip  = makeTooltip(DEL_DEMAND_COLORS);
const DelDevTooltip     = makeTooltip(DEL_DEV_COLORS);
const DelUATTooltip     = makeTooltip(DEL_UAT_COLORS);

/* ══════════════════════════════════════════
   SELECT STYLE
══════════════════════════════════════════ */
const makeSelStyle = (fs = 13) => ({
  background: "#fff", border: "1.5px solid #E5E7EB", borderRadius: 8,
  padding: "6px 28px 6px 10px", fontSize: fs, fontWeight: 500, color: "#374151",
  fontFamily: "inherit", outline: "none", cursor: "pointer",
  appearance: "none", WebkitAppearance: "none",
  backgroundImage: `url("data:image/svg+xml,%3Csvg width='10' height='6' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1l4 4 4-4' stroke='%239CA3AF' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`,
  backgroundRepeat: "no-repeat", backgroundPosition: "right 8px center",
  maxWidth: "100%",
});

/* ══════════════════════════════════════════
   DONUT CARD
══════════════════════════════════════════ */
const DonutCard = ({ title, subtitle, chartData, total, animKey, tooltipContent, icons, showLegend = true, bp }) => {
  const { isMobile, isTablet } = bp;
  const size    = isMobile ? 150 : isTablet ? 170 : 190;
  const innerR  = isMobile ? 44  : isTablet ? 52  : 58;
  const outerR  = isMobile ? 68  : isTablet ? 80  : 90;
  const pad     = isMobile ? "14px" : "20px 22px";
  const centerFs= isMobile ? 15 : 18;

  return (
    <div style={{ background: "#fff", borderRadius: 14, padding: pad, boxShadow: "0 1px 4px rgba(0,0,0,0.05)", display: "flex", flexDirection: "column" }}>
      <div style={{ marginBottom: 12 }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: "#111827" }}>{title}</div>
        {subtitle && <div style={{ fontSize: 10, color: "#9CA3AF", marginTop: 3, fontWeight: 400 }}>{subtitle}</div>}
      </div>

      <div style={{ display: "flex", alignItems: "center", justifyContent: showLegend ? "flex-start" : "center", gap: isMobile ? 10 : 16, flex: 1 }}>
        {/* Donut */}
        <div style={{ position: "relative", flexShrink: 0 }}>
          <ResponsiveContainer width={size} height={size}>
            <PieChart key={animKey}>
              <Pie data={chartData} cx="50%" cy="50%"
                innerRadius={innerR} outerRadius={outerR}
                paddingAngle={2} dataKey="value" labelLine={false}
                label={(props) => <SliceLabel {...props} pct={parseFloat(chartData[props.index]?.pct)} />}
                animationBegin={0} animationDuration={500} isAnimationActive={true}>
                {chartData.map((e, i) => <Cell key={i} fill={e.color} strokeWidth={0} />)}
              </Pie>
              <Tooltip content={tooltipContent} />
            </PieChart>
          </ResponsiveContainer>
          {/* Center label */}
          <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", textAlign: "center", pointerEvents: "none" }}>
            <div style={{ fontSize: centerFs, fontWeight: 800, color: "#111827", lineHeight: 1 }}>{total}</div>
            <div style={{ fontSize: 8, color: "#9CA3AF", textTransform: "uppercase", letterSpacing: "0.08em", marginTop: 2 }}>Total DRFs</div>
          </div>
        </div>

        {/* Dot-only legend (for 3 donut cards without bars) */}
        {!showLegend && (
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {chartData.map(item => (
              <div key={item.name} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <div style={{ width: 9, height: 9, borderRadius: "50%", background: item.color, flexShrink: 0 }} />
                <span style={{ fontSize: 11, color: "#6B7280", fontWeight: 500, whiteSpace: "nowrap" }}>{item.name}</span>
              </div>
            ))}
          </div>
        )}

        {/* Full legend with bars */}
        {showLegend && (
          <div style={{ flex: 1, minWidth: 0 }}>
            {chartData.map(item => (
              <div key={item.name} style={{ marginBottom: 10 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 3 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                    <span style={{ fontSize: 11 }}>{icons[item.name]}</span>
                    <span style={{ fontSize: 10, color: "#6B7280" }}>{item.name}</span>
                  </div>
                  <div>
                    <span style={{ fontSize: 12, fontWeight: 700, color: "#111827" }}>{item.value}</span>
                    <span style={{ fontSize: 10, color: "#9CA3AF", marginLeft: 3 }}>({item.pct}%)</span>
                  </div>
                </div>
                <div style={{ height: 4, background: "#F3F4F6", borderRadius: 99, overflow: "hidden" }}>
                  <div style={{ height: "100%", width: `${item.pct}%`, background: item.color, borderRadius: 99, transition: "width 0.5s ease" }} />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

/* ══════════════════════════════════════════
   BU PROGRESS TABLE (reusable)
══════════════════════════════════════════ */
const BUProgressTable = ({ title, subtitle, jiraData, completedKey, inProgKey, completedLabel, inProgLabel, activeQuarters, isMobile }) => {
  const cols = isMobile ? "90px 1fr 52px" : "130px 1fr 120px";
  const gap  = isMobile ? 8 : 12;

  const grandCompleted = BU_STACK_KEYS.reduce((s, b) => s + activeQuarters.reduce((ss, q) => ss + jiraData[b][q][completedKey], 0), 0);
  const grandInProg    = BU_STACK_KEYS.reduce((s, b) => s + activeQuarters.reduce((ss, q) => ss + jiraData[b][q][inProgKey], 0), 0);
  const grandTotal     = grandCompleted + grandInProg;
  const grandPct       = grandTotal > 0 ? Math.round((grandCompleted / grandTotal) * 100) : 0;

  return (
    <div style={{ background: "#fff", borderRadius: 14, padding: isMobile ? "14px" : "20px 22px", boxShadow: "0 1px 4px rgba(0,0,0,0.05)" }}>
      {/* Header */}
      <div style={{ marginBottom: 18 }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: "#111827" }}>{title}</div>
        {subtitle && <div style={{ fontSize: 10, color: "#9CA3AF", marginTop: 3 }}>{subtitle}</div>}
      </div>

      {/* Column headers */}
      <div style={{ display: "grid", gridTemplateColumns: cols, gap, alignItems: "center", marginBottom: 10, paddingBottom: 8, borderBottom: "1px solid #F3F4F6" }}>
        <div style={{ fontSize: 10, fontWeight: 600, color: "#9CA3AF", textTransform: "uppercase", letterSpacing: "0.07em" }}>Business Unit</div>
        <div style={{ fontSize: 10, fontWeight: 600, color: "#9CA3AF", textTransform: "uppercase", letterSpacing: "0.07em" }}>Progress</div>
        <div style={{ fontSize: 10, fontWeight: 600, color: "#9CA3AF", textTransform: "uppercase", letterSpacing: "0.07em", textAlign: "right" }}>DRFs</div>
      </div>

      {/* BU rows */}
      {BU_STACK_KEYS.map((buName, idx) => {
        const completed = activeQuarters.reduce((s, q) => s + jiraData[buName][q][completedKey], 0);
        const inProg    = activeQuarters.reduce((s, q) => s + jiraData[buName][q][inProgKey], 0);
        const total     = completed + inProg;
        const pct       = total > 0 ? Math.round((completed / total) * 100) : 0;
        return (
          <div key={buName} style={{ display: "grid", gridTemplateColumns: cols, gap, alignItems: "center", padding: "10px 0", borderBottom: idx < BU_STACK_KEYS.length - 1 ? "1px solid #F9FAFB" : "none" }}>
            {/* BU dot + name */}
            <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: BU_COLORS[buName], flexShrink: 0 }} />
              <span style={{ fontSize: isMobile ? 11 : 12, fontWeight: 600, color: "#374151" }}>{buName}</span>
            </div>
            {/* Progress bar */}
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                <span style={{ fontSize: 10, color: "#16A34A", fontWeight: 600 }}>{completedLabel} {pct}%</span>
                <span style={{ fontSize: 10, color: "#EAB308", fontWeight: 600 }}>{inProgLabel} {100 - pct}%</span>
              </div>
              <div style={{ height: 7, background: "#F3F4F6", borderRadius: 99, overflow: "hidden", position: "relative" }}>
                <div style={{ position: "absolute", left: 0, top: 0, height: "100%", width: `${pct}%`, background: "#16A34A", borderRadius: 99, transition: "width 0.5s ease" }} />
                <div style={{ position: "absolute", left: `${pct}%`, top: 0, height: "100%", width: `${100 - pct}%`, background: "#EAB308", borderRadius: 99, transition: "all 0.5s ease" }} />
              </div>
            </div>
            {/* Counts */}
            <div style={{ textAlign: "right" }}>
              {isMobile ? (
                <span style={{ fontSize: 12, fontWeight: 700, color: "#111827" }}>{total}</span>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 1 }}>
                  <div style={{ display: "flex", gap: 8 }}>
                    <span style={{ fontSize: 10, color: "#16A34A", fontWeight: 600 }}>{completed} done</span>
                    <span style={{ fontSize: 10, color: "#EAB308", fontWeight: 600 }}>{inProg} WIP</span>
                  </div>
                  <span style={{ fontSize: 11, fontWeight: 700, color: "#111827" }}>{total} total</span>
                </div>
              )}
            </div>
          </div>
        );
      })}

      {/* Grand total row */}
      <div style={{ marginTop: 12, paddingTop: 12, borderTop: "1px solid #F3F4F6", display: "grid", gridTemplateColumns: cols, gap, alignItems: "center" }}>
        <div style={{ fontSize: isMobile ? 11 : 12, fontWeight: 700, color: "#111827" }}>All BUs</div>
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
            <span style={{ fontSize: 10, color: "#16A34A", fontWeight: 700 }}>{grandPct}% {completedLabel.toLowerCase()}</span>
            <span style={{ fontSize: 10, color: "#EAB308", fontWeight: 700 }}>{100 - grandPct}% {inProgLabel.toLowerCase()}</span>
          </div>
          <div style={{ height: 7, background: "#F3F4F6", borderRadius: 99, overflow: "hidden", position: "relative" }}>
            <div style={{ position: "absolute", left: 0, top: 0, height: "100%", width: `${grandPct}%`, background: "#16A34A", borderRadius: 99 }} />
            <div style={{ position: "absolute", left: `${grandPct}%`, top: 0, height: "100%", width: `${100 - grandPct}%`, background: "#EAB308", borderRadius: 99 }} />
          </div>
        </div>
        <div style={{ textAlign: "right" }}>
          <span style={{ fontSize: isMobile ? 13 : 14, fontWeight: 800, color: "#111827" }}>{grandTotal}</span>
          {!isMobile && <div style={{ fontSize: 9, color: "#9CA3AF" }}>total DRFs</div>}
        </div>
      </div>
    </div>
  );
};

/* ══════════════════════════════════════════
   MAIN DASHBOARD
══════════════════════════════════════════ */
export default function Dashboard() {
  const [bu, setBu]               = useState("All");
  const [quarter, setQuarter]     = useState("All");
  const [animKey, setAnimKey]     = useState(0);
  const [searchInput, setSearchInput] = useState("");
  const [activeDRF, setActiveDRF] = useState(null);
  const [searchError, setSearchError] = useState(false);
  const bp = useBreakpoint();
  const { isMobile, isTablet, isDesktop } = bp;

  useEffect(() => { setAnimKey(k => k + 1); }, [bu, quarter, activeDRF]);

  /* ── Search handler ── */
  const handleSearch = (raw) => {
    const q = raw.trim().toLowerCase();
    if (!q) { setActiveDRF(null); setSearchError(false); return; }
    const found = JIRA_DRFS.find(d =>
      d.id.toLowerCase() === q || d.id.toLowerCase().includes(q) || d.desc.toLowerCase().includes(q)
    );
    if (found) { setActiveDRF(found); setSearchError(false); }
    else       { setActiveDRF(null);  setSearchError(true);  }
  };

  const clearSearch = () => { setSearchInput(""); setActiveDRF(null); setSearchError(false); };

  /* ── Build a single-DRF fake jiraData for BU progress tables ── */
  const makeDrfBuData = (completedKey, inProgKey, drfCompletedVal) => {
    const ds = {};
    BUS.forEach(b => { ds[b] = {}; QUARTERS.forEach(q => { ds[b][q] = { [completedKey]: 0, [inProgKey]: 0 }; }); });
    if (activeDRF) {
      const isCompleted = drfCompletedVal === activeDRF[Object.keys(activeDRF).find(k => k.startsWith("d") || k === "rej")];
      // mark the DRF's BU/quarter with 1 in the correct key
      ds[activeDRF.bu][activeDRF.q][completedKey] = drfCompletedVal ? 1 : 0;
      ds[activeDRF.bu][activeDRF.q][inProgKey]    = drfCompletedVal ? 0 : 1;
      ds["All"][activeDRF.q][completedKey] = drfCompletedVal ? 1 : 0;
      ds["All"][activeDRF.q][inProgKey]    = drfCompletedVal ? 0 : 1;
    }
    return ds;
  };

  const activeQuarters = activeDRF ? [activeDRF.q] : (quarter === "All" ? QUARTERS : [quarter]);
  const activeBu       = activeDRF ? activeDRF.bu : bu;

  const sumAcross = (ds, keys) => {
    const r = {};
    keys.forEach(k => { r[k] = 0; });
    activeQuarters.forEach(q => keys.forEach(k => { r[k] += ds[activeBu][q][k]; }));
    return r;
  };

  /* ── Donut chart data — DRF override or aggregate ── */
  const rawValue = activeDRF
    ? { "Customer Experience": activeDRF.val === "Customer Experience" ? 1 : 0, "Efficiency": activeDRF.val === "Efficiency" ? 1 : 0, "Technology Advancement": activeDRF.val === "Technology Advancement" ? 1 : 0 }
    : sumAcross(JIRA_VALUE, ["Customer Experience", "Efficiency", "Technology Advancement"]);
  const totalValue    = Object.values(rawValue).reduce((s, v) => s + v, 0);
  const valueData     = Object.entries(rawValue).map(([n, v]) => ({ name: n, value: v, color: VALUE_COLORS[n], pct: totalValue > 0 ? ((v / totalValue) * 100).toFixed(1) : "0.0" }));

  const rawDel = activeDRF
    ? { "Delivered to UAT": activeDRF.dSIT === "Delivered to UAT" ? 1 : 0, "Missed/In Progress": activeDRF.dSIT === "Missed/In Progress" ? 1 : 0 }
    : sumAcross(JIRA_DELIVERY, ["Delivered to UAT", "Missed/In Progress"]);
  const totalDel      = Object.values(rawDel).reduce((s, v) => s + v, 0);
  const delData       = Object.entries(rawDel).map(([n, v]) => ({ name: n, value: v, color: DELIVERY_COLORS[n], pct: totalDel > 0 ? ((v / totalDel) * 100).toFixed(1) : "0.0" }));

  const rawSD = activeDRF
    ? { "Completed SD": activeDRF.dSD === "Completed SD" ? 1 : 0, "Missed/In Progress": activeDRF.dSD === "Missed/In Progress" ? 1 : 0 }
    : sumAcross(JIRA_DELIVERY_SD, ["Completed SD", "Missed/In Progress"]);
  const totalSD       = Object.values(rawSD).reduce((s, v) => s + v, 0);
  const sdData        = Object.entries(rawSD).map(([n, v]) => ({ name: n, value: v, color: SD_COLORS[n], pct: totalSD > 0 ? ((v / totalSD) * 100).toFixed(1) : "0.0" }));

  const rawRej = activeDRF
    ? { "Accepted": activeDRF.rej === "Accepted" ? 1 : 0, "Back to demand": activeDRF.rej === "Back to demand" ? 1 : 0 }
    : sumAcross(JIRA_REJECTED, ["Accepted", "Back to demand"]);
  const totalRej      = Object.values(rawRej).reduce((s, v) => s + v, 0);
  const rejectedData  = Object.entries(rawRej).map(([n, v]) => ({ name: n, value: v, color: REJECTED_COLORS[n], pct: totalRej > 0 ? ((v / totalRej) * 100).toFixed(1) : "0.0" }));

  const rawDelDemand = activeDRF
    ? { "Delivered to SD": activeDRF.dDemand === "Delivered to SD" ? 1 : 0, "Missed/In Progress": activeDRF.dDemand === "Missed/In Progress" ? 1 : 0 }
    : sumAcross(JIRA_DEL_DEMAND, ["Delivered to SD", "Missed/In Progress"]);
  const totalDelDemand = Object.values(rawDelDemand).reduce((s, v) => s + v, 0);
  const delDemandData  = Object.entries(rawDelDemand).map(([n, v]) => ({ name: n, value: v, color: DEL_DEMAND_COLORS[n], pct: totalDelDemand > 0 ? ((v / totalDelDemand) * 100).toFixed(1) : "0.0" }));

  const rawDelDev = activeDRF
    ? { "Delivered to SIT/UAT/EUT": activeDRF.dDev === "Delivered to SIT/UAT/EUT" ? 1 : 0, "Missed/In Progress": activeDRF.dDev === "Missed/In Progress" ? 1 : 0 }
    : sumAcross(JIRA_DEL_DEV, ["Delivered to SIT/UAT/EUT", "Missed/In Progress"]);
  const totalDelDev   = Object.values(rawDelDev).reduce((s, v) => s + v, 0);
  const delDevData    = Object.entries(rawDelDev).map(([n, v]) => ({ name: n, value: v, color: DEL_DEV_COLORS[n], pct: totalDelDev > 0 ? ((v / totalDelDev) * 100).toFixed(1) : "0.0" }));

  const rawDelUAT = activeDRF
    ? { "Delivered to RFS/Live": activeDRF.dUAT === "Delivered to RFS/Live" ? 1 : 0, "Missed/In Progress": activeDRF.dUAT === "Missed/In Progress" ? 1 : 0 }
    : sumAcross(JIRA_DEL_UAT, ["Delivered to RFS/Live", "Missed/In Progress"]);
  const totalDelUAT   = Object.values(rawDelUAT).reduce((s, v) => s + v, 0);
  const delUATData    = Object.entries(rawDelUAT).map(([n, v]) => ({ name: n, value: v, color: DEL_UAT_COLORS[n], pct: totalDelUAT > 0 ? ((v / totalDelUAT) * 100).toFixed(1) : "0.0" }));

  const vendorStackData = activeDRF
    ? [{ vendor: activeDRF.vendor, Consumer: 0, Business: 0, Finance: 0, Technology: 0, Others: 0, [activeDRF.bu]: 1 }]
    : ["TCS", "TechM", "Ooredoo Team"].map(vendor => {
        const entry = { vendor };
        BU_STACK_KEYS.forEach(b => { entry[b] = activeQuarters.reduce((s, q) => s + JIRA_VENDOR[b][q][vendor], 0); });
        return entry;
      });

  /* BU table data: override with single-DRF fake datasets when searching */
  const buDemandData  = activeDRF ? makeDrfBuData("Delivered to SD",         "Missed/In Progress",       activeDRF.dDemand  === "Delivered to SD")          : JIRA_DEL_DEMAND;
  const buSdData      = activeDRF ? makeDrfBuData("Completed SD",             "Missed/In Progress",       activeDRF.dSD      === "Completed SD")              : JIRA_DELIVERY_SD;
  const buDevData     = activeDRF ? makeDrfBuData("Delivered to SIT/UAT/EUT", "Missed/In Progress",       activeDRF.dDev     === "Delivered to SIT/UAT/EUT")  : JIRA_DEL_DEV;
  const buSitData     = activeDRF ? makeDrfBuData("Delivered to UAT",         "Missed/In Progress",       activeDRF.dSIT     === "Delivered to UAT")          : JIRA_DELIVERY;
  const buUatData     = activeDRF ? makeDrfBuData("Delivered to RFS/Live",    "Missed/In Progress",       activeDRF.dUAT     === "Delivered to RFS/Live")     : JIRA_DEL_UAT;

  /* Layout tokens */
  const px         = isMobile ? "12px" : isTablet ? "20px" : "28px";
  const cardPad    = isMobile ? "14px" : "20px 22px";
  const donutCols  = isMobile ? 2 : isTablet ? 2 : 4;          // 2-col mobile/tablet, 4-col desktop (rows: 4+3)
  const barHeight  = isMobile ? 140 : isTablet ? 160 : 180;
  const yAxisW     = isMobile ? 70 : 88;
  const showLabels = !isMobile;

  return (
    <div style={{ minHeight: "100vh", background: "#F9FAFB", fontFamily: "'DM Sans', sans-serif" }}>

      {/* ── HEADER ── */}
      <div style={{ background: "#fff", borderBottom: "1px solid #F3F4F6", padding: `12px ${px}` }}>
        <div style={{ display: "flex", alignItems: isMobile ? "flex-start" : "center", justifyContent: "space-between", flexDirection: isMobile ? "column" : "row", gap: isMobile ? 10 : 0 }}>
          <div>
            <div style={{ fontSize: 9, fontWeight: 600, letterSpacing: "0.12em", color: "#9CA3AF", textTransform: "uppercase" }}>Realtime · JIRA</div>
            <div style={{ fontSize: isMobile ? 15 : 17, fontWeight: 700, color: "#111827", letterSpacing: "-0.02em" }}>Demand Dashboard</div>
          </div>
          <div style={{ display: "flex", gap: 6, alignItems: "center", flexWrap: "wrap" }}>
            {/* Search box */}
            <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
              <span style={{ position: "absolute", left: 9, fontSize: 13, color: searchError ? "#EF4444" : activeDRF ? "#16A34A" : "#9CA3AF", pointerEvents: "none" }}>🔍</span>
              <input
                type="text"
                placeholder="Search OQ number or description…"
                value={searchInput}
                onChange={e => { setSearchInput(e.target.value); if (!e.target.value.trim()) clearSearch(); }}
                onKeyDown={e => { if (e.key === "Enter") handleSearch(searchInput); }}
                style={{
                  fontSize: isMobile ? 11 : 12, height: 32, paddingLeft: 28, paddingRight: activeDRF ? 28 : 10,
                  border: `1.5px solid ${searchError ? "#FCA5A5" : activeDRF ? "#86EFAC" : "#E5E7EB"}`,
                  borderRadius: 8, background: searchError ? "#FEF2F2" : activeDRF ? "#F0FDF4" : "#F9FAFB",
                  color: "#374151", outline: "none", width: isMobile ? 200 : 260, fontFamily: "'DM Sans', sans-serif",
                  transition: "border-color 0.2s, background 0.2s"
                }}
              />
              {activeDRF && (
                <button onClick={clearSearch} style={{ position: "absolute", right: 7, background: "none", border: "none", cursor: "pointer", fontSize: 14, color: "#9CA3AF", padding: 0, lineHeight: 1 }}>✕</button>
              )}
            </div>
            <button
              onClick={() => handleSearch(searchInput)}
              style={{ height: 32, padding: "0 12px", fontSize: isMobile ? 11 : 12, fontWeight: 600, background: "#2563EB", color: "#fff", border: "none", borderRadius: 8, cursor: "pointer", fontFamily: "'DM Sans', sans-serif" }}
            >Search</button>
            <div style={{ width: 1, height: 24, background: "#E5E7EB", margin: "0 2px" }} />
            <select value={bu}      onChange={e => { setBu(e.target.value); clearSearch(); }} style={makeSelStyle(isMobile ? 12 : 13)}>
              {BUS.map(b => <option key={b}>{b}</option>)}
            </select>
            <select value={quarter} onChange={e => { setQuarter(e.target.value); clearSearch(); }} style={makeSelStyle(isMobile ? 12 : 13)}>
              {QUARTER_OPTIONS.map(q => <option key={q}>{q}</option>)}
            </select>
            <span style={{ fontSize: 12, fontWeight: 600, color: "#6B7280", background: "#F3F4F6", borderRadius: 7, padding: "6px 10px" }}>2026</span>
          </div>
        </div>

        {/* DRF active banner */}
        {activeDRF && (
          <div style={{ marginTop: 10, background: "#F0FDF4", border: "1px solid #86EFAC", borderRadius: 8, padding: "8px 14px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 6 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ fontSize: 13 }}>🎯</span>
              <span style={{ fontSize: 11, fontWeight: 700, color: "#15803D" }}>{activeDRF.id}</span>
              <span style={{ fontSize: 11, color: "#374151" }}>{activeDRF.desc}</span>
            </div>
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
              {[["BU", activeDRF.bu, BU_COLORS[activeDRF.bu] || "#6B7280"],["Quarter", activeDRF.q, "#2563EB"],["Stage", activeDRF.stage, "#7C3AED"],["Vendor", activeDRF.vendor, VENDOR_COLORS[activeDRF.vendor]],["Days", activeDRF.days + "d", activeDRF.days <= 7 ? "#16A34A" : activeDRF.days <= 21 ? "#D97706" : "#DC2626"]].map(([label, val, color]) => (
                <span key={label} style={{ fontSize: 10, fontWeight: 600, color, background: color + "18", borderRadius: 99, padding: "2px 8px", whiteSpace: "nowrap" }}>{label}: {val}</span>
              ))}
            </div>
          </div>
        )}

        {/* Search error */}
        {searchError && (
          <div style={{ marginTop: 8, fontSize: 11, color: "#EF4444", fontWeight: 500 }}>
            ⚠️ No DRF found matching "{searchInput}". Try the OQ number (e.g. OQ-1) or part of the description.
          </div>
        )}
      </div>

      {/* ── DONUT CARDS GRID ── */}
      {/* Row 1: 4 cards | Row 2: 3 cards (desktop), 2-col wrap on tablet/mobile */}
      <div style={{ padding: `${isMobile ? "14px" : "22px"} ${px} 0`, display: "grid", gridTemplateColumns: `repeat(${isMobile ? 2 : isTablet ? 2 : 4}, 1fr)`, gap: isMobile ? 10 : 14 }}>
        <DonutCard title="Value of Request"       subtitle="Distribution of DRFs by strategic value category"                     chartData={valueData}     total={totalValue}     animKey={`val-${animKey}`}  tooltipContent={<ValueTooltip />}     icons={VALUE_ICONS}      showLegend={true}  bp={bp} />
        <DonutCard title="Delivery % Demand"      subtitle="DRFs progressed to Solution Design stage"                            chartData={delDemandData}  total={totalDelDemand} animKey={`dmd-${animKey}`}  tooltipContent={<DelDemandTooltip />} icons={DEL_DEMAND_ICONS} showLegend={false} bp={bp} />
        <DonutCard title="Delivery % SD"          subtitle="SD completion status within the same month"                          chartData={sdData}        total={totalSD}        animKey={`sd-${animKey}`}   tooltipContent={<SDTooltip />}        icons={SD_ICONS}         showLegend={false} bp={bp} />
        <DonutCard title="% DRF Rejected"         subtitle="SD Acceptance rate of submitted demand requests within the same month" chartData={rejectedData}  total={totalRej}       animKey={`rej-${animKey}`}  tooltipContent={<RejectedTooltip />}  icons={REJECTED_ICONS}   showLegend={false} bp={bp} />
        <DonutCard title="Delivery % Development" subtitle="DRFs delivered into SIT, UAT or EUT testing phases"                  chartData={delDevData}    total={totalDelDev}    animKey={`dev-${animKey}`}  tooltipContent={<DelDevTooltip />}    icons={DEL_DEV_ICONS}    showLegend={false} bp={bp} />
        <DonutCard title="Delivery % to SIT"      subtitle="Tracks DRFs delivered to UAT vs. still in progress"                  chartData={delData}       total={totalDel}       animKey={`del-${animKey}`}  tooltipContent={<DeliveryTooltip />}  icons={DELIVERY_ICONS}   showLegend={false} bp={bp} />
        <DonutCard title="Delivery % UAT"         subtitle="DRFs signed off and delivered to RFS or Live"                        chartData={delUATData}    total={totalDelUAT}    animKey={`uat-${animKey}`}  tooltipContent={<DelUATTooltip />}    icons={DEL_UAT_ICONS}    showLegend={false} bp={bp} />
      </div>

      {/* ── BU PROGRESS TABLES GRID (items 8–12) ── */}
      <div style={{ padding: `${isMobile ? "12px" : "20px"} ${px} 0` }}>
        <div style={{ marginBottom: isMobile ? 10 : 14 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: "#111827" }}>Delivery Breakdown by Business Unit</div>
          <div style={{ fontSize: 10, color: "#9CA3AF", marginTop: 3 }}>Progress across all delivery stages, per BU</div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: isMobile ? 10 : 14 }}>
          <BUProgressTable
            title="Delivery % Demand by Business Unit"
            subtitle="DRFs progressed to Solution Design stage, broken down per BU"
            jiraData={buDemandData}
            completedKey="Delivered to SD"
            inProgKey="Missed/In Progress"
            completedLabel="Delivered"
            inProgLabel="Missed/WIP"
            activeQuarters={activeQuarters}
            isMobile={isMobile}
          />
          <BUProgressTable
            title="Delivery % SD by Business Unit"
            subtitle="SD completion status within the same month, broken down per BU"
            jiraData={buSdData}
            completedKey="Completed SD"
            inProgKey="Missed/In Progress"
            completedLabel="Completed"
            inProgLabel="Missed/WIP"
            activeQuarters={activeQuarters}
            isMobile={isMobile}
          />
          <BUProgressTable
            title="Delivery % Development by Business Unit"
            subtitle="DRFs delivered into SIT, UAT or EUT testing phases, per BU"
            jiraData={buDevData}
            completedKey="Delivered to SIT/UAT/EUT"
            inProgKey="Missed/In Progress"
            completedLabel="Delivered"
            inProgLabel="Missed/WIP"
            activeQuarters={activeQuarters}
            isMobile={isMobile}
          />
          <BUProgressTable
            title="Delivery % to SIT by Business Unit"
            subtitle="Tracks DRFs delivered to UAT vs. still in progress, per BU"
            jiraData={buSitData}
            completedKey="Delivered to UAT"
            inProgKey="Missed/In Progress"
            completedLabel="Delivered"
            inProgLabel="Missed/WIP"
            activeQuarters={activeQuarters}
            isMobile={isMobile}
          />
          <BUProgressTable
            title="Delivery % UAT by Business Unit"
            subtitle="DRFs signed off and delivered to RFS or Live, per BU"
            jiraData={buUatData}
            completedKey="Delivered to RFS/Live"
            inProgKey="Missed/In Progress"
            completedLabel="Delivered"
            inProgLabel="Missed/WIP"
            activeQuarters={activeQuarters}
            isMobile={isMobile}
          />
        </div>
      </div>

      {/* ── IMPACTED REQUEST LEAD BY (item 13) ── */}
      <div style={{ padding: `${isMobile ? "12px" : "20px"} ${px} 0` }}>
        <div style={{ background: "#fff", borderRadius: 14, padding: cardPad, boxShadow: "0 1px 4px rgba(0,0,0,0.05)" }}>

          {/* Card header */}
          <div style={{ marginBottom: 14, display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexDirection: isDesktop ? "row" : "column", gap: 8 }}>
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, color: "#111827" }}>Impacted Request Lead By</div>
              <div style={{ fontSize: 10, color: "#9CA3AF", marginTop: 3, fontWeight: 400 }}>Total DRF volume handled per vendor, broken down by business unit</div>
            </div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {BU_STACK_KEYS.map(b => (
                <div key={b} style={{ display: "flex", alignItems: "center", gap: 4 }}>
                  <div style={{ width: 9, height: 9, borderRadius: 2, background: BU_COLORS[b], flexShrink: 0 }} />
                  <span style={{ fontSize: 11, color: "#6B7280", fontWeight: 500 }}>{b}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Horizontal stacked bar */}
          <ResponsiveContainer width="100%" height={barHeight}>
            <BarChart layout="vertical" data={vendorStackData} barCategoryGap="35%"
              margin={{ top: 4, right: isMobile ? 6 : 32, left: 4, bottom: 4 }}>
              <CartesianGrid horizontal={false} stroke="#F3F4F6" />
              <YAxis dataKey="vendor" type="category" axisLine={false} tickLine={false}
                tick={{ fontSize: isMobile ? 10 : 12, fill: "#374151", fontFamily: "inherit", fontWeight: 600 }}
                width={yAxisW} />
              <XAxis type="number" axisLine={false} tickLine={false}
                tick={{ fontSize: 10, fill: "#9CA3AF", fontFamily: "inherit" }} />
              <Tooltip cursor={{ fill: "#F9FAFB" }}
                content={({ active, payload, label }) => {
                  if (!active || !payload?.length) return null;
                  const rowTotal = payload.reduce((s, p) => s + p.value, 0);
                  return (
                    <div style={{ background: "#fff", border: "1px solid #F3F4F6", borderRadius: 8, padding: "10px 14px", boxShadow: "0 4px 20px rgba(0,0,0,0.09)", fontSize: 13, fontFamily: "inherit" }}>
                      <div style={{ fontWeight: 700, color: "#111827", marginBottom: 8 }}>{label}</div>
                      {[...payload].reverse().map(p => (
                        <div key={p.dataKey} style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
                          <div style={{ width: 8, height: 8, borderRadius: 2, background: BU_COLORS[p.dataKey], flexShrink: 0 }} />
                          <span style={{ color: "#6B7280", minWidth: 70 }}>{p.dataKey}</span>
                          <span style={{ fontWeight: 700, color: BU_COLORS[p.dataKey] }}>{p.value}</span>
                          <span style={{ color: "#9CA3AF", fontSize: 11 }}>({((p.value / rowTotal) * 100).toFixed(0)}%)</span>
                        </div>
                      ))}
                      <div style={{ borderTop: "1px solid #F3F4F6", marginTop: 6, paddingTop: 6, fontSize: 11, color: "#9CA3AF" }}>
                        Total: <span style={{ fontWeight: 700, color: "#374151" }}>{rowTotal} DRFs</span>
                      </div>
                    </div>
                  );
                }}
              />
              {BU_STACK_KEYS.map((b, i) => (
                <Bar key={b} dataKey={b} stackId="a" fill={BU_COLORS[b]}
                  radius={i === BU_STACK_KEYS.length - 1 ? [0, 6, 6, 0] : [0, 0, 0, 0]}
                  isAnimationActive={true} animationDuration={500}>
                  {showLabels && <LabelList dataKey={b} position="inside" style={{ fontSize: 10, fontWeight: 700, fill: "#fff", fontFamily: "inherit" }} />}
                </Bar>
              ))}
            </BarChart>
          </ResponsiveContainer>

          {/* Vendor summary cards */}
          <div style={{ display: "grid", gridTemplateColumns: `repeat(3, 1fr)`, gap: isMobile ? 8 : 12, marginTop: 14, borderTop: "1px solid #F3F4F6", paddingTop: 14 }}>
            {vendorStackData.map(v => {
              const vTotal = BU_STACK_KEYS.reduce((s, b) => s + (v[b] || 0), 0);
              return (
                <div key={v.vendor} style={{ padding: isMobile ? "10px 8px" : "12px 14px", background: "#F9FAFB", borderRadius: 8, borderTop: `3px solid ${VENDOR_COLORS[v.vendor]}`, textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
                  <div style={{ fontSize: isMobile ? 10 : 11, fontWeight: 600, color: "#6B7280" }}>{v.vendor}</div>
                  <div style={{ fontSize: isMobile ? 18 : 22, fontWeight: 800, color: "#111827", lineHeight: 1 }}>{vTotal}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── DEVELOPMENT DELIVERY BY VENDOR (UAT) ── */}
      <div style={{ padding: `${isMobile ? "12px" : "20px"} ${px} 0` }}>
        <div style={{ background: "#fff", borderRadius: 14, padding: cardPad, boxShadow: "0 1px 4px rgba(0,0,0,0.05)" }}>

          {/* Header */}
          <div style={{ marginBottom: 18 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: "#111827" }}>Development Delivery to UAT by Vendor</div>
            <div style={{ fontSize: 10, color: "#9CA3AF", marginTop: 3 }}>DRFs delivered vs missed/in progress to UAT, broken down per vendor</div>
          </div>

          {/* Column headers */}
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "90px 1fr 52px" : "140px 1fr 140px", gap: isMobile ? 8 : 12, alignItems: "center", marginBottom: 10, paddingBottom: 8, borderBottom: "1px solid #F3F4F6" }}>
            <div style={{ fontSize: 10, fontWeight: 600, color: "#9CA3AF", textTransform: "uppercase", letterSpacing: "0.07em" }}>Vendor</div>
            <div style={{ fontSize: 10, fontWeight: 600, color: "#9CA3AF", textTransform: "uppercase", letterSpacing: "0.07em" }}>UAT Delivery Progress</div>
            <div style={{ fontSize: 10, fontWeight: 600, color: "#9CA3AF", textTransform: "uppercase", letterSpacing: "0.07em", textAlign: "right" }}>DRFs</div>
          </div>

          {/* Vendor rows */}
          {["TCS", "TechM", "Ooredoo Team"].map((vendor, idx) => {
            const delivered = activeQuarters.reduce((s, q) => s + JIRA_VENDOR_UAT[bu][q][vendor]["Delivered to UAT"], 0);
            const missed    = activeQuarters.reduce((s, q) => s + JIRA_VENDOR_UAT[bu][q][vendor]["Missed/In Progress"], 0);
            const total     = delivered + missed;
            const pct       = total > 0 ? Math.round((delivered / total) * 100) : 0;
            return (
              <div key={vendor} style={{ display: "grid", gridTemplateColumns: isMobile ? "90px 1fr 52px" : "140px 1fr 140px", gap: isMobile ? 8 : 12, alignItems: "center", padding: "12px 0", borderBottom: idx < 2 ? "1px solid #F9FAFB" : "none" }}>

                {/* Vendor name + colour dot */}
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <div style={{ width: 8, height: 8, borderRadius: "50%", background: VENDOR_COLORS[vendor], flexShrink: 0 }} />
                  <span style={{ fontSize: isMobile ? 11 : 12, fontWeight: 600, color: "#374151" }}>{vendor}</span>
                </div>

                {/* Progress bar */}
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                    <span style={{ fontSize: 10, color: "#16A34A", fontWeight: 600 }}>Delivered {pct}%</span>
                    <span style={{ fontSize: 10, color: "#EAB308", fontWeight: 600 }}>Missed/WIP {100 - pct}%</span>
                  </div>
                  <div style={{ height: 7, background: "#F3F4F6", borderRadius: 99, overflow: "hidden", position: "relative" }}>
                    <div style={{ position: "absolute", left: 0, top: 0, height: "100%", width: `${pct}%`, background: "#16A34A", borderRadius: 99, transition: "width 0.5s ease" }} />
                    <div style={{ position: "absolute", left: `${pct}%`, top: 0, height: "100%", width: `${100 - pct}%`, background: "#EAB308", borderRadius: 99, transition: "all 0.5s ease" }} />
                  </div>
                </div>

                {/* DRF counts */}
                <div style={{ textAlign: "right" }}>
                  {isMobile ? (
                    <span style={{ fontSize: 12, fontWeight: 700, color: "#111827" }}>{total}</span>
                  ) : (
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 1 }}>
                      <div style={{ display: "flex", gap: 8 }}>
                        <span style={{ fontSize: 10, color: "#16A34A", fontWeight: 600 }}>{delivered} delivered</span>
                        <span style={{ fontSize: 10, color: "#EAB308", fontWeight: 600 }}>{missed} missed</span>
                      </div>
                      <span style={{ fontSize: 11, fontWeight: 700, color: "#111827" }}>{total} total</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}

          {/* Grand total row */}
          {(() => {
            const grandDel   = ["TCS", "TechM", "Ooredoo Team"].reduce((s, v) => s + activeQuarters.reduce((ss, q) => ss + JIRA_VENDOR_UAT[bu][q][v]["Delivered to UAT"], 0), 0);
            const grandMissed= ["TCS", "TechM", "Ooredoo Team"].reduce((s, v) => s + activeQuarters.reduce((ss, q) => ss + JIRA_VENDOR_UAT[bu][q][v]["Missed/In Progress"], 0), 0);
            const grandTotal = grandDel + grandMissed;
            const grandPct   = grandTotal > 0 ? Math.round((grandDel / grandTotal) * 100) : 0;
            return (
              <div style={{ marginTop: 12, paddingTop: 12, borderTop: "1px solid #F3F4F6", display: "grid", gridTemplateColumns: isMobile ? "90px 1fr 52px" : "140px 1fr 140px", gap: isMobile ? 8 : 12, alignItems: "center" }}>
                <div style={{ fontSize: isMobile ? 11 : 12, fontWeight: 700, color: "#111827" }}>All Vendors</div>
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                    <span style={{ fontSize: 10, color: "#16A34A", fontWeight: 700 }}>{grandPct}% delivered</span>
                    <span style={{ fontSize: 10, color: "#EAB308", fontWeight: 700 }}>{100 - grandPct}% missed/WIP</span>
                  </div>
                  <div style={{ height: 7, background: "#F3F4F6", borderRadius: 99, overflow: "hidden", position: "relative" }}>
                    <div style={{ position: "absolute", left: 0, top: 0, height: "100%", width: `${grandPct}%`, background: "#16A34A", borderRadius: 99 }} />
                    <div style={{ position: "absolute", left: `${grandPct}%`, top: 0, height: "100%", width: `${100 - grandPct}%`, background: "#EAB308", borderRadius: 99 }} />
                  </div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <span style={{ fontSize: isMobile ? 13 : 14, fontWeight: 800, color: "#111827" }}>{grandTotal}</span>
                  {!isMobile && <div style={{ fontSize: 9, color: "#9CA3AF" }}>total DRFs</div>}
                </div>
              </div>
            );
          })()}
        </div>
      </div>

      {/* ── DRF AGING PIPELINE ── */}
      <div style={{ padding: `${isMobile ? "12px" : "20px"} ${px} 0` }}>
        <div style={{ background: "#fff", borderRadius: 14, padding: cardPad, boxShadow: "0 1px 4px rgba(0,0,0,0.05)" }}>

          {/* Header */}
          <div style={{ marginBottom: isMobile ? 16 : 22 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: "#111827" }}>DRF Aging Pipeline</div>
            <div style={{ fontSize: 10, color: "#9CA3AF", marginTop: 3 }}>Number of DRFs currently active at each stage with average days spent, broken down per BU</div>
          </div>

          {(() => {
            const STAGES       = ["BU", "Demand", "SD", "Development", "SIT", "UAT", "RFS/Live"];
            const STAGE_COLORS = ["#7C3AED","#2563EB","#0891B2","#059669","#D97706","#DC2626","#0F766E"];
            const STAGE_ICONS  = ["📋","📝","🔧","💻","🧪","✅","🚀"];
            const dayColor     = (d) => d <= 7 ? "#16A34A" : d <= 21 ? "#F59E0B" : "#EF4444";
            const dayLabel     = (d) => d <= 7 ? "On Track" : d <= 21 ? "At Risk" : "Overdue";

            // Aggregate totals across active quarters for selected BU
            const stageData = STAGES.map((stage, i) => {
              const totalCount = activeQuarters.reduce((s, q) => s + JIRA_AGING[bu][q][stage].count, 0);
              const avgDays    = Math.round(activeQuarters.reduce((s, q) => s + JIRA_AGING[bu][q][stage].avgDays, 0) / activeQuarters.length);
              return { stage, count: totalCount, avgDays, color: STAGE_COLORS[i], icon: STAGE_ICONS[i] };
            });
            const maxCount = Math.max(...stageData.map(s => s.count));

            // Per-BU breakdown (always shown for "All BUs" context)
            const buBreakdown = BU_STACK_KEYS.map(buName => ({
              bu: buName,
              stages: STAGES.map((stage, i) => {
                const count   = activeQuarters.reduce((s, q) => s + JIRA_AGING[buName][q][stage].count, 0);
                const avgDays = Math.round(activeQuarters.reduce((s, q) => s + JIRA_AGING[buName][q][stage].avgDays, 0) / activeQuarters.length);
                return { stage, count, avgDays, color: STAGE_COLORS[i] };
              }),
            }));

            return (
              <div>
                {/* ── KPI SUMMARY CARDS ── */}
                <div style={{ marginBottom: isMobile ? 20 : 28 }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: "#374151", marginBottom: 12 }}>Stage Summary</div>
                  <div style={{ display: "grid", gridTemplateColumns: `repeat(${isMobile ? 2 : 7}, 1fr)`, gap: isMobile ? 8 : 10 }}>
                    {stageData.map((s) => (
                      <div key={s.stage} style={{ background: "#F9FAFB", borderRadius: 10, padding: isMobile ? "10px 8px" : "12px 14px", borderTop: `3px solid ${s.color}`, display: "flex", flexDirection: "column", gap: 4 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                          <span style={{ fontSize: 14 }}>{s.icon}</span>
                          <span style={{ fontSize: isMobile ? 9 : 10, fontWeight: 600, color: s.color, textTransform: "uppercase", letterSpacing: "0.06em" }}>{s.stage}</span>
                        </div>
                        <div style={{ fontSize: isMobile ? 20 : 24, fontWeight: 800, color: s.color, lineHeight: 1 }}>{s.count}</div>
                        <div style={{ fontSize: 10, fontWeight: 600, color: dayColor(s.avgDays), background: dayColor(s.avgDays) + "18", borderRadius: 99, padding: "2px 7px", alignSelf: "flex-start", whiteSpace: "nowrap" }}>
                          ~{s.avgDays}d · {dayLabel(s.avgDays)}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* ── PER-BU BREAKDOWN TABLE ── */}
                <div style={{ borderTop: "1px solid #F3F4F6", paddingTop: isMobile ? 16 : 20 }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: "#374151", marginBottom: 12 }}>Aging by Business Unit</div>

                  {/* Table header — each stage has its own background color pill */}
                  <div style={{ display: "grid", gridTemplateColumns: `${isMobile ? "72px" : "100px"} repeat(7, 1fr)`, gap: 6, marginBottom: 6, paddingBottom: 10, borderBottom: "1px solid #F3F4F6" }}>
                    <div style={{ fontSize: 9, fontWeight: 600, color: "#9CA3AF", textTransform: "uppercase", display: "flex", alignItems: "center" }}>BU</div>
                    {STAGES.map((stage, i) => (
                      <div key={stage} style={{ textAlign: "center" }}>
                        <span style={{ display: "inline-block", fontSize: isMobile ? 8 : 9, fontWeight: 700, color: "#fff", background: STAGE_COLORS[i], borderRadius: 99, padding: isMobile ? "3px 5px" : "3px 8px", whiteSpace: "nowrap", letterSpacing: "0.03em" }}>
                          {stage}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* BU rows */}
                  {buBreakdown.map((row, rowIdx) => (
                    <div key={row.bu} style={{ display: "grid", gridTemplateColumns: `${isMobile ? "72px" : "100px"} repeat(7, 1fr)`, gap: 6, padding: "9px 0", borderBottom: rowIdx < buBreakdown.length - 1 ? "1px solid #F9FAFB" : "none", alignItems: "center" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                        <div style={{ width: 7, height: 7, borderRadius: "50%", background: BU_COLORS[row.bu], flexShrink: 0 }} />
                        <span style={{ fontSize: isMobile ? 10 : 11, fontWeight: 600, color: "#374151" }}>{row.bu}</span>
                      </div>
                      {row.stages.map((cell) => (
                        <div key={cell.stage} style={{ textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
                          <div style={{ fontSize: isMobile ? 12 : 14, fontWeight: 800, color: cell.color, lineHeight: 1 }}>{cell.count}</div>
                          <div style={{ fontSize: 9, fontWeight: 600, color: dayColor(cell.avgDays), background: dayColor(cell.avgDays) + "18", borderRadius: 99, padding: "1px 5px", whiteSpace: "nowrap" }}>~{cell.avgDays}d</div>
                        </div>
                      ))}
                    </div>
                  ))}

                  {/* All BUs grand total row */}
                  <div style={{ display: "grid", gridTemplateColumns: `${isMobile ? "72px" : "100px"} repeat(7, 1fr)`, gap: 6, marginTop: 10, paddingTop: 10, borderTop: "1px solid #F3F4F6", alignItems: "center" }}>
                    <div style={{ fontSize: isMobile ? 10 : 11, fontWeight: 700, color: "#111827" }}>All BUs</div>
                    {stageData.map((s) => (
                      <div key={s.stage} style={{ textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
                        <div style={{ fontSize: isMobile ? 13 : 15, fontWeight: 800, color: s.color, lineHeight: 1 }}>{s.count}</div>
                        <div style={{ fontSize: 9, fontWeight: 600, color: dayColor(s.avgDays), background: dayColor(s.avgDays) + "18", borderRadius: 99, padding: "1px 5px", whiteSpace: "nowrap" }}>~{s.avgDays}d</div>
                      </div>
                    ))}
                  </div>

                  {/* Legend */}
                  <div style={{ display: "flex", gap: 16, marginTop: 16, flexWrap: "wrap" }}>
                    {[["#16A34A","On Track (≤7d)"],["#F59E0B","At Risk (8–21d)"],["#EF4444","Overdue (>21d)"]].map(([color, label]) => (
                      <div key={label} style={{ display: "flex", alignItems: "center", gap: 5 }}>
                        <div style={{ width: 8, height: 8, borderRadius: "50%", background: color }} />
                        <span style={{ fontSize: 10, color: "#6B7280", fontWeight: 500 }}>{label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })()}
        </div>
      </div>

      {/* bottom spacing */}
      <div style={{ height: isMobile ? 16 : 28 }} />

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&display=swap');
        *, *::before, *::after { box-sizing: border-box; }
        body { margin: 0; }
        select:focus { outline: none; box-shadow: 0 0 0 2px #2563EB40; border-color: #2563EB !important; }
      `}</style>
    </div>
  );
}
