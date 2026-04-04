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
/* Value of Request — RFS/Live vs In Progress breakdown per type */
const JIRA_VALUE_STATUS = {
  All:        {
    Q1: { "Customer Experience": { "RFS/Live": 31, "In Progress": 17 }, Efficiency: { "RFS/Live": 22, "In Progress": 15 }, "Technology Advancement": { "RFS/Live": 10, "In Progress": 11 } },
    Q2: { "Customer Experience": { "RFS/Live": 37, "In Progress": 18 }, Efficiency: { "RFS/Live": 27, "In Progress": 15 }, "Technology Advancement": { "RFS/Live": 14, "In Progress": 14 } },
    Q3: { "Customer Experience": { "RFS/Live": 42, "In Progress": 19 }, Efficiency: { "RFS/Live": 25, "In Progress": 14 }, "Technology Advancement": { "RFS/Live": 18, "In Progress": 15 } },
    Q4: { "Customer Experience": { "RFS/Live": 34, "In Progress": 18 }, Efficiency: { "RFS/Live": 28, "In Progress": 16 }, "Technology Advancement": { "RFS/Live": 16, "In Progress": 14 } },
  },
  Consumer:   {
    Q1: { "Customer Experience": { "RFS/Live": 15, "In Progress": 7  }, Efficiency: { "RFS/Live": 7,  "In Progress": 4  }, "Technology Advancement": { "RFS/Live": 3, "In Progress": 4 } },
    Q2: { "Customer Experience": { "RFS/Live": 18, "In Progress": 9  }, Efficiency: { "RFS/Live": 9,  "In Progress": 5  }, "Technology Advancement": { "RFS/Live": 5, "In Progress": 4 } },
    Q3: { "Customer Experience": { "RFS/Live": 20, "In Progress": 10 }, Efficiency: { "RFS/Live": 8,  "In Progress": 5  }, "Technology Advancement": { "RFS/Live": 6, "In Progress": 4 } },
    Q4: { "Customer Experience": { "RFS/Live": 17, "In Progress": 8  }, Efficiency: { "RFS/Live": 10, "In Progress": 5  }, "Technology Advancement": { "RFS/Live": 4, "In Progress": 4 } },
  },
  Business:   {
    Q1: { "Customer Experience": { "RFS/Live": 8,  "In Progress": 5  }, Efficiency: { "RFS/Live": 12, "In Progress": 7  }, "Technology Advancement": { "RFS/Live": 4, "In Progress": 4 } },
    Q2: { "Customer Experience": { "RFS/Live": 9,  "In Progress": 5  }, Efficiency: { "RFS/Live": 14, "In Progress": 7  }, "Technology Advancement": { "RFS/Live": 5, "In Progress": 5 } },
    Q3: { "Customer Experience": { "RFS/Live": 10, "In Progress": 6  }, Efficiency: { "RFS/Live": 12, "In Progress": 6  }, "Technology Advancement": { "RFS/Live": 6, "In Progress": 6 } },
    Q4: { "Customer Experience": { "RFS/Live": 9,  "In Progress": 5  }, Efficiency: { "RFS/Live": 13, "In Progress": 7  }, "Technology Advancement": { "RFS/Live": 6, "In Progress": 5 } },
  },
  Finance:    {
    Q1: { "Customer Experience": { "RFS/Live": 3,  "In Progress": 2  }, Efficiency: { "RFS/Live": 2,  "In Progress": 1  }, "Technology Advancement": { "RFS/Live": 4, "In Progress": 3 } },
    Q2: { "Customer Experience": { "RFS/Live": 3,  "In Progress": 2  }, Efficiency: { "RFS/Live": 3,  "In Progress": 1  }, "Technology Advancement": { "RFS/Live": 5, "In Progress": 4 } },
    Q3: { "Customer Experience": { "RFS/Live": 4,  "In Progress": 2  }, Efficiency: { "RFS/Live": 3,  "In Progress": 1  }, "Technology Advancement": { "RFS/Live": 6, "In Progress": 4 } },
    Q4: { "Customer Experience": { "RFS/Live": 3,  "In Progress": 2  }, Efficiency: { "RFS/Live": 2,  "In Progress": 1  }, "Technology Advancement": { "RFS/Live": 4, "In Progress": 4 } },
  },
  Technology: {
    Q1: { "Customer Experience": { "RFS/Live": 2,  "In Progress": 1  }, Efficiency: { "RFS/Live": 1,  "In Progress": 1  }, "Technology Advancement": { "RFS/Live": 4, "In Progress": 3 } },
    Q2: { "Customer Experience": { "RFS/Live": 2,  "In Progress": 2  }, Efficiency: { "RFS/Live": 1,  "In Progress": 1  }, "Technology Advancement": { "RFS/Live": 5, "In Progress": 4 } },
    Q3: { "Customer Experience": { "RFS/Live": 3,  "In Progress": 1  }, Efficiency: { "RFS/Live": 2,  "In Progress": 1  }, "Technology Advancement": { "RFS/Live": 6, "In Progress": 4 } },
    Q4: { "Customer Experience": { "RFS/Live": 2,  "In Progress": 2  }, Efficiency: { "RFS/Live": 2,  "In Progress": 1  }, "Technology Advancement": { "RFS/Live": 5, "In Progress": 3 } },
  },
  Others:     {
    Q1: { "Customer Experience": { "RFS/Live": 3,  "In Progress": 2  }, Efficiency: { "RFS/Live": 1,  "In Progress": 1  }, "Technology Advancement": { "RFS/Live": 2, "In Progress": 2 } },
    Q2: { "Customer Experience": { "RFS/Live": 3,  "In Progress": 2  }, Efficiency: { "RFS/Live": 1,  "In Progress": 0  }, "Technology Advancement": { "RFS/Live": 2, "In Progress": 1 } },
    Q3: { "Customer Experience": { "RFS/Live": 3,  "In Progress": 2  }, Efficiency: { "RFS/Live": 1,  "In Progress": 0  }, "Technology Advancement": { "RFS/Live": 2, "In Progress": 1 } },
    Q4: { "Customer Experience": { "RFS/Live": 3,  "In Progress": 1  }, Efficiency: { "RFS/Live": 2,  "In Progress": 1  }, "Technology Advancement": { "RFS/Live": 3, "In Progress": 2 } },
  },
};
const JIRA_DELIVERY = {
  All:        { Q1: { "Delivered to UAT": 72, "In Progress": 34 }, Q2: { "Delivered to UAT": 89, "In Progress": 36 }, Q3: { "Delivered to UAT": 95, "In Progress": 38 }, Q4: { "Delivered to UAT": 81, "In Progress": 45 } },
  Consumer:   { Q1: { "Delivered to UAT": 28, "In Progress": 12 }, Q2: { "Delivered to UAT": 35, "In Progress": 15 }, Q3: { "Delivered to UAT": 40, "In Progress": 13 }, Q4: { "Delivered to UAT": 32, "In Progress": 16 } },
  Business:   { Q1: { "Delivered to UAT": 22, "In Progress": 18 }, Q2: { "Delivered to UAT": 28, "In Progress": 17 }, Q3: { "Delivered to UAT": 30, "In Progress": 16 }, Q4: { "Delivered to UAT": 25, "In Progress": 20 } },
  Finance:    { Q1: { "Delivered to UAT": 9,  "In Progress": 7  }, Q2: { "Delivered to UAT": 11, "In Progress": 8  }, Q3: { "Delivered to UAT": 12, "In Progress": 9  }, Q4: { "Delivered to UAT": 10, "In Progress": 8  } },
  Technology: { Q1: { "Delivered to UAT": 6,  "In Progress": 5  }, Q2: { "Delivered to UAT": 7,  "In Progress": 7  }, Q3: { "Delivered to UAT": 8,  "In Progress": 8  }, Q4: { "Delivered to UAT": 7,  "In Progress": 6  } },
  Others:     { Q1: { "Delivered to UAT": 7,  "In Progress": 4  }, Q2: { "Delivered to UAT": 8,  "In Progress": 3  }, Q3: { "Delivered to UAT": 5,  "In Progress": 4  }, Q4: { "Delivered to UAT": 7,  "In Progress": 5  } },
};
const JIRA_DELIVERY_SD = {
  All:        { Q1: { "Completed SD": 65, "In Progress": 41 }, Q2: { "Completed SD": 78, "In Progress": 47 }, Q3: { "Completed SD": 88, "In Progress": 45 }, Q4: { "Completed SD": 74, "In Progress": 52 } },
  Consumer:   { Q1: { "Completed SD": 25, "In Progress": 15 }, Q2: { "Completed SD": 31, "In Progress": 19 }, Q3: { "Completed SD": 36, "In Progress": 17 }, Q4: { "Completed SD": 28, "In Progress": 20 } },
  Business:   { Q1: { "Completed SD": 19, "In Progress": 21 }, Q2: { "Completed SD": 24, "In Progress": 20 }, Q3: { "Completed SD": 27, "In Progress": 19 }, Q4: { "Completed SD": 22, "In Progress": 23 } },
  Finance:    { Q1: { "Completed SD": 8,  "In Progress": 8  }, Q2: { "Completed SD": 10, "In Progress": 9  }, Q3: { "Completed SD": 12, "In Progress": 10 }, Q4: { "Completed SD": 9,  "In Progress": 9  } },
  Technology: { Q1: { "Completed SD": 5,  "In Progress": 6  }, Q2: { "Completed SD": 6,  "In Progress": 8  }, Q3: { "Completed SD": 7,  "In Progress": 9  }, Q4: { "Completed SD": 6,  "In Progress": 7  } },
  Others:     { Q1: { "Completed SD": 8,  "In Progress": 3  }, Q2: { "Completed SD": 7,  "In Progress": 4  }, Q3: { "Completed SD": 6,  "In Progress": 4  }, Q4: { "Completed SD": 9,  "In Progress": 5  } },
};
const JIRA_REJECTED = {
  All:        { Q1: { "Accepted to SD": 81, "Returned to Demand": 25 }, Q2: { "Accepted to SD": 96, "Returned to Demand": 29 }, Q3: { "Accepted to SD": 102, "Returned to Demand": 31 }, Q4: { "Accepted to SD": 88, "Returned to Demand": 38 } },
  Consumer:   { Q1: { "Accepted to SD": 31, "Returned to Demand": 9  }, Q2: { "Accepted to SD": 38, "Returned to Demand": 12 }, Q3: { "Accepted to SD": 42, "Returned to Demand": 11 }, Q4: { "Accepted to SD": 35, "Returned to Demand": 13 } },
  Business:   { Q1: { "Accepted to SD": 24, "Returned to Demand": 16 }, Q2: { "Accepted to SD": 29, "Returned to Demand": 16 }, Q3: { "Accepted to SD": 32, "Returned to Demand": 14 }, Q4: { "Accepted to SD": 27, "Returned to Demand": 18 } },
  Finance:    { Q1: { "Accepted to SD": 11, "Returned to Demand": 6  }, Q2: { "Accepted to SD": 13, "Returned to Demand": 7  }, Q3: { "Accepted to SD": 15, "Returned to Demand": 7  }, Q4: { "Accepted to SD": 12, "Returned to Demand": 8  } },
  Technology: { Q1: { "Accepted to SD": 8,  "Returned to Demand": 3  }, Q2: { "Accepted to SD": 9,  "Returned to Demand": 4  }, Q3: { "Accepted to SD": 11, "Returned to Demand": 5  }, Q4: { "Accepted to SD": 9,  "Returned to Demand": 4  } },
  Others:     { Q1: { "Accepted to SD": 7,  "Returned to Demand": 4  }, Q2: { "Accepted to SD": 7,  "Returned to Demand": 3  }, Q3: { "Accepted to SD": 6,  "Returned to Demand": 4  }, Q4: { "Accepted to SD": 5,  "Returned to Demand": 5  } },
};
const JIRA_DEL_DEMAND = {
  All:        { Q1: { "Delivered to SD": 88, "In Progress": 18 }, Q2: { "Delivered to SD": 104, "In Progress": 21 }, Q3: { "Delivered to SD": 113, "In Progress": 20 }, Q4: { "Delivered to SD": 97,  "In Progress": 29 } },
  Consumer:   { Q1: { "Delivered to SD": 34, "In Progress": 6  }, Q2: { "Delivered to SD": 42,  "In Progress": 8  }, Q3: { "Delivered to SD": 46,  "In Progress": 7  }, Q4: { "Delivered to SD": 39,  "In Progress": 9  } },
  Business:   { Q1: { "Delivered to SD": 27, "In Progress": 13 }, Q2: { "Delivered to SD": 32,  "In Progress": 13 }, Q3: { "Delivered to SD": 35,  "In Progress": 11 }, Q4: { "Delivered to SD": 29,  "In Progress": 16 } },
  Finance:    { Q1: { "Delivered to SD": 12, "In Progress": 5  }, Q2: { "Delivered to SD": 14,  "In Progress": 6  }, Q3: { "Delivered to SD": 16,  "In Progress": 6  }, Q4: { "Delivered to SD": 13,  "In Progress": 7  } },
  Technology: { Q1: { "Delivered to SD": 8,  "In Progress": 3  }, Q2: { "Delivered to SD": 9,   "In Progress": 4  }, Q3: { "Delivered to SD": 10,  "In Progress": 4  }, Q4: { "Delivered to SD": 9,   "In Progress": 4  } },
  Others:     { Q1: { "Delivered to SD": 7,  "In Progress": 3  }, Q2: { "Delivered to SD": 7,   "In Progress": 2  }, Q3: { "Delivered to SD": 6,   "In Progress": 3  }, Q4: { "Delivered to SD": 7,   "In Progress": 3  } },
};
const JIRA_DEL_DEV = {
  All:        { Q1: { "Delivered to SIT/UAT/EUT": 75, "In Progress": 31 }, Q2: { "Delivered to SIT/UAT/EUT": 90,  "In Progress": 35 }, Q3: { "Delivered to SIT/UAT/EUT": 97,  "In Progress": 36 }, Q4: { "Delivered to SIT/UAT/EUT": 83,  "In Progress": 43 } },
  Consumer:   { Q1: { "Delivered to SIT/UAT/EUT": 29, "In Progress": 11 }, Q2: { "Delivered to SIT/UAT/EUT": 36,  "In Progress": 14 }, Q3: { "Delivered to SIT/UAT/EUT": 39,  "In Progress": 14 }, Q4: { "Delivered to SIT/UAT/EUT": 33,  "In Progress": 15 } },
  Business:   { Q1: { "Delivered to SIT/UAT/EUT": 23, "In Progress": 17 }, Q2: { "Delivered to SIT/UAT/EUT": 27,  "In Progress": 18 }, Q3: { "Delivered to SIT/UAT/EUT": 30,  "In Progress": 17 }, Q4: { "Delivered to SIT/UAT/EUT": 25,  "In Progress": 20 } },
  Finance:    { Q1: { "Delivered to SIT/UAT/EUT": 10, "In Progress": 7  }, Q2: { "Delivered to SIT/UAT/EUT": 12,  "In Progress": 8  }, Q3: { "Delivered to SIT/UAT/EUT": 13,  "In Progress": 8  }, Q4: { "Delivered to SIT/UAT/EUT": 11,  "In Progress": 9  } },
  Technology: { Q1: { "Delivered to SIT/UAT/EUT": 7,  "In Progress": 4  }, Q2: { "Delivered to SIT/UAT/EUT": 8,   "In Progress": 5  }, Q3: { "Delivered to SIT/UAT/EUT": 9,   "In Progress": 5  }, Q4: { "Delivered to SIT/UAT/EUT": 8,   "In Progress": 5  } },
  Others:     { Q1: { "Delivered to SIT/UAT/EUT": 6,  "In Progress": 4  }, Q2: { "Delivered to SIT/UAT/EUT": 7,   "In Progress": 3  }, Q3: { "Delivered to SIT/UAT/EUT": 6,   "In Progress": 4  }, Q4: { "Delivered to SIT/UAT/EUT": 6,   "In Progress": 5  } },
};
const JIRA_DEL_UAT = {
  All:        { Q1: { "Delivered to RFS/Live": 62, "In Progress": 44 }, Q2: { "Delivered to RFS/Live": 76,  "In Progress": 49 }, Q3: { "Delivered to RFS/Live": 84,  "In Progress": 49 }, Q4: { "Delivered to RFS/Live": 70,  "In Progress": 56 } },
  Consumer:   { Q1: { "Delivered to RFS/Live": 24, "In Progress": 16 }, Q2: { "Delivered to RFS/Live": 30,  "In Progress": 20 }, Q3: { "Delivered to RFS/Live": 33,  "In Progress": 20 }, Q4: { "Delivered to RFS/Live": 27,  "In Progress": 21 } },
  Business:   { Q1: { "Delivered to RFS/Live": 19, "In Progress": 21 }, Q2: { "Delivered to RFS/Live": 23,  "In Progress": 22 }, Q3: { "Delivered to RFS/Live": 26,  "In Progress": 21 }, Q4: { "Delivered to RFS/Live": 21,  "In Progress": 24 } },
  Finance:    { Q1: { "Delivered to RFS/Live": 8,  "In Progress": 9  }, Q2: { "Delivered to RFS/Live": 10,  "In Progress": 10 }, Q3: { "Delivered to RFS/Live": 11,  "In Progress": 10 }, Q4: { "Delivered to RFS/Live": 9,   "In Progress": 11 } },
  Technology: { Q1: { "Delivered to RFS/Live": 5,  "In Progress": 6  }, Q2: { "Delivered to RFS/Live": 7,   "In Progress": 6  }, Q3: { "Delivered to RFS/Live": 7,   "In Progress": 7  }, Q4: { "Delivered to RFS/Live": 6,   "In Progress": 7  } },
  Others:     { Q1: { "Delivered to RFS/Live": 6,  "In Progress": 4  }, Q2: { "Delivered to RFS/Live": 6,   "In Progress": 4  }, Q3: { "Delivered to RFS/Live": 7,   "In Progress": 4  }, Q4: { "Delivered to RFS/Live": 7,   "In Progress": 5  } },
};

/* Delivery % Live — DRFs confirmed live in production */
const JIRA_DEL_LIVE = {
  All:        { Q1: { "Delivered to Live": 48, "In Progress": 58 }, Q2: { "Delivered to Live": 60,  "In Progress": 65 }, Q3: { "Delivered to Live": 67,  "In Progress": 66 }, Q4: { "Delivered to Live": 54,  "In Progress": 72 } },
  Consumer:   { Q1: { "Delivered to Live": 18, "In Progress": 22 }, Q2: { "Delivered to Live": 23,  "In Progress": 27 }, Q3: { "Delivered to Live": 26,  "In Progress": 27 }, Q4: { "Delivered to Live": 20,  "In Progress": 28 } },
  Business:   { Q1: { "Delivered to Live": 14, "In Progress": 26 }, Q2: { "Delivered to Live": 18,  "In Progress": 27 }, Q3: { "Delivered to Live": 20,  "In Progress": 27 }, Q4: { "Delivered to Live": 16,  "In Progress": 29 } },
  Finance:    { Q1: { "Delivered to Live": 6,  "In Progress": 11 }, Q2: { "Delivered to Live": 8,   "In Progress": 12 }, Q3: { "Delivered to Live": 9,   "In Progress": 12 }, Q4: { "Delivered to Live": 7,   "In Progress": 14 } },
  Technology: { Q1: { "Delivered to Live": 4,  "In Progress": 7  }, Q2: { "Delivered to Live": 5,   "In Progress": 8  }, Q3: { "Delivered to Live": 6,   "In Progress": 8  }, Q4: { "Delivered to Live": 5,   "In Progress": 9  } },
  Others:     { Q1: { "Delivered to Live": 6,  "In Progress": 4  }, Q2: { "Delivered to Live": 6,   "In Progress": 5  }, Q3: { "Delivered to Live": 6,   "In Progress": 5  }, Q4: { "Delivered to Live": 6,   "In Progress": 6  } },
};

/* DRFs returned from Development stage */
const JIRA_DEV_RETURNED = {
  All:        { Q1: { "Returned": 9,  "Returned to Demand": 5,  "Not Returned": 92  }, Q2: { "Returned": 10, "Returned to Demand": 6,  "Not Returned": 109 }, Q3: { "Returned": 11, "Returned to Demand": 7,  "Not Returned": 115 }, Q4: { "Returned": 9,  "Returned to Demand": 6,  "Not Returned": 111 } },
  Consumer:   { Q1: { "Returned": 3,  "Returned to Demand": 2,  "Not Returned": 35  }, Q2: { "Returned": 4,  "Returned to Demand": 2,  "Not Returned": 43  }, Q3: { "Returned": 4,  "Returned to Demand": 3,  "Not Returned": 45  }, Q4: { "Returned": 4,  "Returned to Demand": 2,  "Not Returned": 42  } },
  Business:   { Q1: { "Returned": 2,  "Returned to Demand": 2,  "Not Returned": 36  }, Q2: { "Returned": 3,  "Returned to Demand": 2,  "Not Returned": 40  }, Q3: { "Returned": 3,  "Returned to Demand": 2,  "Not Returned": 42  }, Q4: { "Returned": 2,  "Returned to Demand": 2,  "Not Returned": 41  } },
  Finance:    { Q1: { "Returned": 1,  "Returned to Demand": 1,  "Not Returned": 13  }, Q2: { "Returned": 1,  "Returned to Demand": 1,  "Not Returned": 15  }, Q3: { "Returned": 2,  "Returned to Demand": 1,  "Not Returned": 16  }, Q4: { "Returned": 1,  "Returned to Demand": 1,  "Not Returned": 14  } },
  Technology: { Q1: { "Returned": 1,  "Returned to Demand": 1,  "Not Returned": 10  }, Q2: { "Returned": 1,  "Returned to Demand": 1,  "Not Returned": 11  }, Q3: { "Returned": 1,  "Returned to Demand": 1,  "Not Returned": 12  }, Q4: { "Returned": 1,  "Returned to Demand": 1,  "Not Returned": 11  } },
  Others:     { Q1: { "Returned": 1,  "Returned to Demand": 0,  "Not Returned": 8   }, Q2: { "Returned": 1,  "Returned to Demand": 0,  "Not Returned": 8   }, Q3: { "Returned": 1,  "Returned to Demand": 0,  "Not Returned": 8   }, Q4: { "Returned": 1,  "Returned to Demand": 0,  "Not Returned": 9   } },
};

/* DRFs returned from SIT stage */
const JIRA_SIT_RETURNED = {
  All:        { Q1: { "Returned": 6,  "Returned to SD": 3,  "Returned to Demand": 2,  "Not Returned": 95  }, Q2: { "Returned": 7,  "Returned to SD": 4,  "Returned to Demand": 2,  "Not Returned": 112 }, Q3: { "Returned": 8,  "Returned to SD": 4,  "Returned to Demand": 2,  "Not Returned": 119 }, Q4: { "Returned": 6,  "Returned to SD": 4,  "Returned to Demand": 2,  "Not Returned": 114 } },
  Consumer:   { Q1: { "Returned": 2,  "Returned to SD": 1,  "Returned to Demand": 1,  "Not Returned": 36  }, Q2: { "Returned": 3,  "Returned to SD": 1,  "Returned to Demand": 1,  "Not Returned": 45  }, Q3: { "Returned": 3,  "Returned to SD": 1,  "Returned to Demand": 1,  "Not Returned": 48  }, Q4: { "Returned": 2,  "Returned to SD": 1,  "Returned to Demand": 1,  "Not Returned": 44  } },
  Business:   { Q1: { "Returned": 2,  "Returned to SD": 1,  "Returned to Demand": 0,  "Not Returned": 37  }, Q2: { "Returned": 2,  "Returned to SD": 1,  "Returned to Demand": 1,  "Not Returned": 41  }, Q3: { "Returned": 2,  "Returned to SD": 1,  "Returned to Demand": 1,  "Not Returned": 43  }, Q4: { "Returned": 2,  "Returned to SD": 1,  "Returned to Demand": 1,  "Not Returned": 41  } },
  Finance:    { Q1: { "Returned": 1,  "Returned to SD": 1,  "Returned to Demand": 0,  "Not Returned": 13  }, Q2: { "Returned": 1,  "Returned to SD": 1,  "Returned to Demand": 0,  "Not Returned": 16  }, Q3: { "Returned": 1,  "Returned to SD": 1,  "Returned to Demand": 0,  "Not Returned": 17  }, Q4: { "Returned": 1,  "Returned to SD": 1,  "Returned to Demand": 0,  "Not Returned": 14  } },
  Technology: { Q1: { "Returned": 1,  "Returned to SD": 0,  "Returned to Demand": 0,  "Not Returned": 11  }, Q2: { "Returned": 1,  "Returned to SD": 0,  "Returned to Demand": 0,  "Not Returned": 12  }, Q3: { "Returned": 1,  "Returned to SD": 1,  "Returned to Demand": 0,  "Not Returned": 12  }, Q4: { "Returned": 1,  "Returned to SD": 0,  "Returned to Demand": 0,  "Not Returned": 12  } },
  Others:     { Q1: { "Returned": 0,  "Returned to SD": 0,  "Returned to Demand": 1,  "Not Returned": 8   }, Q2: { "Returned": 0,  "Returned to SD": 1,  "Returned to Demand": 0,  "Not Returned": 8   }, Q3: { "Returned": 1,  "Returned to SD": 0,  "Returned to Demand": 0,  "Not Returned": 9   }, Q4: { "Returned": 0,  "Returned to SD": 1,  "Returned to Demand": 0,  "Not Returned": 9   } },
};

/* DRFs returned from UAT stage */
const JIRA_UAT_RETURNED = {
  All:        { Q1: { "Returned": 4,  "Returned to Development": 2,  "Returned to SD": 1,  "Returned to Demand": 1,  "Not Returned": 98  }, Q2: { "Returned": 4,  "Returned to Development": 2,  "Returned to SD": 2,  "Returned to Demand": 1,  "Not Returned": 116 }, Q3: { "Returned": 5,  "Returned to Development": 2,  "Returned to SD": 2,  "Returned to Demand": 1,  "Not Returned": 123 }, Q4: { "Returned": 4,  "Returned to Development": 2,  "Returned to SD": 2,  "Returned to Demand": 1,  "Not Returned": 117 } },
  Consumer:   { Q1: { "Returned": 2,  "Returned to Development": 1,  "Returned to SD": 0,  "Returned to Demand": 0,  "Not Returned": 37  }, Q2: { "Returned": 1,  "Returned to Development": 1,  "Returned to SD": 1,  "Returned to Demand": 0,  "Not Returned": 47  }, Q3: { "Returned": 2,  "Returned to Development": 1,  "Returned to SD": 1,  "Returned to Demand": 0,  "Not Returned": 49  }, Q4: { "Returned": 1,  "Returned to Development": 1,  "Returned to SD": 1,  "Returned to Demand": 0,  "Not Returned": 45  } },
  Business:   { Q1: { "Returned": 1,  "Returned to Development": 1,  "Returned to SD": 0,  "Returned to Demand": 0,  "Not Returned": 38  }, Q2: { "Returned": 1,  "Returned to Development": 1,  "Returned to SD": 1,  "Returned to Demand": 0,  "Not Returned": 42  }, Q3: { "Returned": 2,  "Returned to Development": 1,  "Returned to SD": 0,  "Returned to Demand": 0,  "Not Returned": 44  }, Q4: { "Returned": 1,  "Returned to Development": 1,  "Returned to SD": 1,  "Returned to Demand": 0,  "Not Returned": 42  } },
  Finance:    { Q1: { "Returned": 0,  "Returned to Development": 0,  "Returned to SD": 1,  "Returned to Demand": 0,  "Not Returned": 14  }, Q2: { "Returned": 1,  "Returned to Development": 0,  "Returned to SD": 0,  "Returned to Demand": 0,  "Not Returned": 17  }, Q3: { "Returned": 0,  "Returned to Development": 0,  "Returned to SD": 1,  "Returned to Demand": 0,  "Not Returned": 18  }, Q4: { "Returned": 1,  "Returned to Development": 0,  "Returned to SD": 0,  "Returned to Demand": 0,  "Not Returned": 15  } },
  Technology: { Q1: { "Returned": 1,  "Returned to Development": 0,  "Returned to SD": 0,  "Returned to Demand": 0,  "Not Returned": 11  }, Q2: { "Returned": 1,  "Returned to Development": 0,  "Returned to SD": 0,  "Returned to Demand": 0,  "Not Returned": 12  }, Q3: { "Returned": 1,  "Returned to Development": 0,  "Returned to SD": 0,  "Returned to Demand": 0,  "Not Returned": 13  }, Q4: { "Returned": 1,  "Returned to Development": 0,  "Returned to SD": 0,  "Returned to Demand": 0,  "Not Returned": 12  } },
  Others:     { Q1: { "Returned": 0,  "Returned to Development": 0,  "Returned to SD": 0,  "Returned to Demand": 1,  "Not Returned": 8   }, Q2: { "Returned": 0,  "Returned to Development": 0,  "Returned to SD": 0,  "Returned to Demand": 1,  "Not Returned": 8   }, Q3: { "Returned": 0,  "Returned to Development": 0,  "Returned to SD": 0,  "Returned to Demand": 1,  "Not Returned": 9   }, Q4: { "Returned": 0,  "Returned to Development": 0,  "Returned to SD": 0,  "Returned to Demand": 1,  "Not Returned": 9   } },
};

/* BU DRFs Touching One or Multiple Vendors */
const JIRA_VENDOR_OVERLAP = {
  Consumer:   { Q1: { "Single Vendor": 18, "Two Vendors": 10, "All Three": 6  }, Q2: { "Single Vendor": 21, "Two Vendors": 13, "All Three": 8  }, Q3: { "Single Vendor": 24, "Two Vendors": 14, "All Three": 9  }, Q4: { "Single Vendor": 20, "Two Vendors": 12, "All Three": 7  } },
  Business:   { Q1: { "Single Vendor": 12, "Two Vendors": 11, "All Three": 7  }, Q2: { "Single Vendor": 15, "Two Vendors": 12, "All Three": 8  }, Q3: { "Single Vendor": 17, "Two Vendors": 14, "All Three": 9  }, Q4: { "Single Vendor": 14, "Two Vendors": 13, "All Three": 8  } },
  Finance:    { Q1: { "Single Vendor": 7,  "Two Vendors": 4,  "All Three": 3  }, Q2: { "Single Vendor": 9,  "Two Vendors": 5,  "All Three": 3  }, Q3: { "Single Vendor": 10, "Two Vendors": 5,  "All Three": 4  }, Q4: { "Single Vendor": 8,  "Two Vendors": 5,  "All Three": 3  } },
  Technology: { Q1: { "Single Vendor": 5,  "Two Vendors": 4,  "All Three": 2  }, Q2: { "Single Vendor": 6,  "Two Vendors": 4,  "All Three": 3  }, Q3: { "Single Vendor": 7,  "Two Vendors": 4,  "All Three": 3  }, Q4: { "Single Vendor": 6,  "Two Vendors": 5,  "All Three": 2  } },
  Others:     { Q1: { "Single Vendor": 5,  "Two Vendors": 3,  "All Three": 1  }, Q2: { "Single Vendor": 5,  "Two Vendors": 3,  "All Three": 1  }, Q3: { "Single Vendor": 6,  "Two Vendors": 3,  "All Three": 2  }, Q4: { "Single Vendor": 5,  "Two Vendors": 3,  "All Three": 1  } },
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
  All:        { Q1: { TCS: { "Delivered to UAT": 26, "In Progress": 12 }, TechM: { "Delivered to UAT": 19, "In Progress": 10 }, "Ooredoo Team": { "Delivered to UAT": 14, "In Progress": 8  } },
                Q2: { TCS: { "Delivered to UAT": 31, "In Progress": 13 }, TechM: { "Delivered to UAT": 22, "In Progress": 11 }, "Ooredoo Team": { "Delivered to UAT": 17, "In Progress": 9  } },
                Q3: { TCS: { "Delivered to UAT": 36, "In Progress": 15 }, TechM: { "Delivered to UAT": 26, "In Progress": 12 }, "Ooredoo Team": { "Delivered to UAT": 20, "In Progress": 11 } },
                Q4: { TCS: { "Delivered to UAT": 32, "In Progress": 14 }, TechM: { "Delivered to UAT": 24, "In Progress": 11 }, "Ooredoo Team": { "Delivered to UAT": 18, "In Progress": 10 } } },
  Consumer:   { Q1: { TCS: { "Delivered to UAT": 11, "In Progress": 5  }, TechM: { "Delivered to UAT": 7,  "In Progress": 3  }, "Ooredoo Team": { "Delivered to UAT": 5,  "In Progress": 3  } },
                Q2: { TCS: { "Delivered to UAT": 13, "In Progress": 6  }, TechM: { "Delivered to UAT": 9,  "In Progress": 4  }, "Ooredoo Team": { "Delivered to UAT": 7,  "In Progress": 3  } },
                Q3: { TCS: { "Delivered to UAT": 15, "In Progress": 7  }, TechM: { "Delivered to UAT": 10, "In Progress": 5  }, "Ooredoo Team": { "Delivered to UAT": 8,  "In Progress": 3  } },
                Q4: { TCS: { "Delivered to UAT": 12, "In Progress": 6  }, TechM: { "Delivered to UAT": 8,  "In Progress": 4  }, "Ooredoo Team": { "Delivered to UAT": 6,  "In Progress": 3  } } },
  Business:   { Q1: { TCS: { "Delivered to UAT": 8,  "In Progress": 4  }, TechM: { "Delivered to UAT": 7,  "In Progress": 4  }, "Ooredoo Team": { "Delivered to UAT": 5,  "In Progress": 2  } },
                Q2: { TCS: { "Delivered to UAT": 9,  "In Progress": 5  }, TechM: { "Delivered to UAT": 8,  "In Progress": 4  }, "Ooredoo Team": { "Delivered to UAT": 6,  "In Progress": 3  } },
                Q3: { TCS: { "Delivered to UAT": 11, "In Progress": 6  }, TechM: { "Delivered to UAT": 9,  "In Progress": 5  }, "Ooredoo Team": { "Delivered to UAT": 7,  "In Progress": 4  } },
                Q4: { TCS: { "Delivered to UAT": 10, "In Progress": 5  }, TechM: { "Delivered to UAT": 8,  "In Progress": 5  }, "Ooredoo Team": { "Delivered to UAT": 6,  "In Progress": 4  } } },
  Finance:    { Q1: { TCS: { "Delivered to UAT": 3,  "In Progress": 1  }, TechM: { "Delivered to UAT": 2,  "In Progress": 1  }, "Ooredoo Team": { "Delivered to UAT": 2,  "In Progress": 1  } },
                Q2: { TCS: { "Delivered to UAT": 3,  "In Progress": 2  }, TechM: { "Delivered to UAT": 2,  "In Progress": 2  }, "Ooredoo Team": { "Delivered to UAT": 2,  "In Progress": 1  } },
                Q3: { TCS: { "Delivered to UAT": 4,  "In Progress": 1  }, TechM: { "Delivered to UAT": 3,  "In Progress": 1  }, "Ooredoo Team": { "Delivered to UAT": 2,  "In Progress": 2  } },
                Q4: { TCS: { "Delivered to UAT": 4,  "In Progress": 2  }, TechM: { "Delivered to UAT": 3,  "In Progress": 1  }, "Ooredoo Team": { "Delivered to UAT": 2,  "In Progress": 1  } } },
  Technology: { Q1: { TCS: { "Delivered to UAT": 2,  "In Progress": 1  }, TechM: { "Delivered to UAT": 2,  "In Progress": 1  }, "Ooredoo Team": { "Delivered to UAT": 1,  "In Progress": 1  } },
                Q2: { TCS: { "Delivered to UAT": 2,  "In Progress": 1  }, TechM: { "Delivered to UAT": 1,  "In Progress": 1  }, "Ooredoo Team": { "Delivered to UAT": 2,  "In Progress": 1  } },
                Q3: { TCS: { "Delivered to UAT": 3,  "In Progress": 1  }, TechM: { "Delivered to UAT": 2,  "In Progress": 1  }, "Ooredoo Team": { "Delivered to UAT": 2,  "In Progress": 1  } },
                Q4: { TCS: { "Delivered to UAT": 3,  "In Progress": 1  }, TechM: { "Delivered to UAT": 2,  "In Progress": 2  }, "Ooredoo Team": { "Delivered to UAT": 2,  "In Progress": 2  } } },
  Others:     { Q1: { TCS: { "Delivered to UAT": 2,  "In Progress": 1  }, TechM: { "Delivered to UAT": 1,  "In Progress": 1  }, "Ooredoo Team": { "Delivered to UAT": 1,  "In Progress": 1  } },
                Q2: { TCS: { "Delivered to UAT": 4,  "In Progress": 1  }, TechM: { "Delivered to UAT": 2,  "In Progress": 1  }, "Ooredoo Team": { "Delivered to UAT": 0,  "In Progress": 1  } },
                Q3: { TCS: { "Delivered to UAT": 3,  "In Progress": 1  }, TechM: { "Delivered to UAT": 2,  "In Progress": 1  }, "Ooredoo Team": { "Delivered to UAT": 1,  "In Progress": 1  } },
                Q4: { TCS: { "Delivered to UAT": 3,  "In Progress": 1  }, TechM: { "Delivered to UAT": 3,  "In Progress": 1  }, "Ooredoo Team": { "Delivered to UAT": 2,  "In Progress": 1  } } },
};

/* ── Individual DRF Records (for search) ── */
const JIRA_DRFS = [
  { id:"OQ-1", desc:"Customer portal UI refresh",              bu:"Consumer",   q:"Q1", val:"Customer Experience",    dDemand:"Delivered to SD",    dSD:"Completed SD",             dDev:"Delivered to SIT/UAT/EUT", dSIT:"Delivered to UAT",    dUAT:"Delivered to RFS/Live",  rej:"Accepted to SD",        vendor:"TCS",          stage:"RFS/Live",    days:3  },
  { id:"OQ-2", desc:"Mobile app onboarding redesign",          bu:"Consumer",   q:"Q1", val:"Customer Experience",    dDemand:"Delivered to SD",    dSD:"In Progress",       dDev:"In Progress",       dSIT:"In Progress",  dUAT:"In Progress",     rej:"Accepted to SD",        vendor:"TechM",        stage:"SD",          days:17 },
  { id:"OQ-3", desc:"Loyalty rewards engine upgrade",          bu:"Consumer",   q:"Q2", val:"Efficiency",             dDemand:"Delivered to SD",    dSD:"Completed SD",             dDev:"Delivered to SIT/UAT/EUT", dSIT:"Delivered to UAT",    dUAT:"In Progress",     rej:"Accepted to SD",        vendor:"TCS",          stage:"UAT",         days:9  },
  { id:"OQ-4", desc:"Self-service billing portal",             bu:"Consumer",   q:"Q2", val:"Customer Experience",    dDemand:"In Progress", dSD:"In Progress",       dDev:"In Progress",       dSIT:"In Progress",  dUAT:"In Progress",     rej:"Returned to Demand",  vendor:"Ooredoo Team", stage:"Demand",      days:12 },
  { id:"OQ-5", desc:"AI chatbot for customer support",         bu:"Consumer",   q:"Q3", val:"Technology Advancement", dDemand:"Delivered to SD",    dSD:"Completed SD",             dDev:"Delivered to SIT/UAT/EUT", dSIT:"Delivered to UAT",    dUAT:"Delivered to RFS/Live",  rej:"Accepted to SD",        vendor:"TCS",          stage:"RFS/Live",    days:2  },
  { id:"OQ-6", desc:"Prepaid data bundle configurator",        bu:"Consumer",   q:"Q3", val:"Customer Experience",    dDemand:"Delivered to SD",    dSD:"In Progress",       dDev:"In Progress",       dSIT:"In Progress",  dUAT:"In Progress",     rej:"Accepted to SD",        vendor:"TechM",        stage:"Development", days:26 },
  { id:"OQ-7", desc:"e-KYC digital onboarding flow",           bu:"Consumer",   q:"Q4", val:"Efficiency",             dDemand:"Delivered to SD",    dSD:"Completed SD",             dDev:"Delivered to SIT/UAT/EUT", dSIT:"In Progress",  dUAT:"In Progress",     rej:"Accepted to SD",        vendor:"TCS",          stage:"SIT",         days:11 },
  { id:"OQ-8", desc:"Roaming package comparison tool",         bu:"Consumer",   q:"Q4", val:"Customer Experience",    dDemand:"In Progress", dSD:"In Progress",       dDev:"In Progress",       dSIT:"In Progress",  dUAT:"In Progress",     rej:"Returned to Demand",  vendor:"Ooredoo Team", stage:"BU",          days:5  },
  { id:"OQ-9", desc:"B2B contract renewal automation",         bu:"Business",   q:"Q1", val:"Efficiency",             dDemand:"Delivered to SD",    dSD:"Completed SD",             dDev:"Delivered to SIT/UAT/EUT", dSIT:"Delivered to UAT",    dUAT:"Delivered to RFS/Live",  rej:"Accepted to SD",        vendor:"TechM",        stage:"RFS/Live",    days:4  },
  { id:"OQ-10", desc:"Enterprise SLA dashboard",                bu:"Business",   q:"Q1", val:"Customer Experience",    dDemand:"Delivered to SD",    dSD:"In Progress",       dDev:"In Progress",       dSIT:"In Progress",  dUAT:"In Progress",     rej:"Accepted to SD",        vendor:"TCS",          stage:"SD",          days:15 },
  { id:"OQ-11", desc:"Bulk SMS campaign manager",               bu:"Business",   q:"Q2", val:"Efficiency",             dDemand:"Delivered to SD",    dSD:"Completed SD",             dDev:"Delivered to SIT/UAT/EUT", dSIT:"Delivered to UAT",    dUAT:"In Progress",     rej:"Accepted to SD",        vendor:"TechM",        stage:"UAT",         days:8  },
  { id:"OQ-12", desc:"IoT device fleet management",             bu:"Business",   q:"Q2", val:"Technology Advancement", dDemand:"In Progress", dSD:"In Progress",       dDev:"In Progress",       dSIT:"In Progress",  dUAT:"In Progress",     rej:"Returned to Demand",  vendor:"Ooredoo Team", stage:"Demand",      days:14 },
  { id:"OQ-13", desc:"Corporate data plan self-service",        bu:"Business",   q:"Q3", val:"Customer Experience",    dDemand:"Delivered to SD",    dSD:"Completed SD",             dDev:"Delivered to SIT/UAT/EUT", dSIT:"Delivered to UAT",    dUAT:"Delivered to RFS/Live",  rej:"Accepted to SD",        vendor:"TCS",          stage:"RFS/Live",    days:3  },
  { id:"OQ-14", desc:"API gateway for partner integrations",    bu:"Business",   q:"Q3", val:"Technology Advancement", dDemand:"Delivered to SD",    dSD:"In Progress",       dDev:"In Progress",       dSIT:"In Progress",  dUAT:"In Progress",     rej:"Accepted to SD",        vendor:"TechM",        stage:"Development", days:29 },
  { id:"OQ-15", desc:"Multi-tenant billing engine",             bu:"Business",   q:"Q4", val:"Efficiency",             dDemand:"Delivered to SD",    dSD:"Completed SD",             dDev:"In Progress",       dSIT:"In Progress",  dUAT:"In Progress",     rej:"Accepted to SD",        vendor:"TCS",          stage:"Development", days:22 },
  { id:"OQ-16", desc:"Partner portal revamp",                   bu:"Business",   q:"Q4", val:"Customer Experience",    dDemand:"In Progress", dSD:"In Progress",       dDev:"In Progress",       dSIT:"In Progress",  dUAT:"In Progress",     rej:"Returned to Demand",  vendor:"Ooredoo Team", stage:"BU",          days:6  },
  { id:"OQ-17", desc:"Revenue assurance automation",            bu:"Finance",    q:"Q1", val:"Efficiency",             dDemand:"Delivered to SD",    dSD:"Completed SD",             dDev:"Delivered to SIT/UAT/EUT", dSIT:"Delivered to UAT",    dUAT:"Delivered to RFS/Live",  rej:"Accepted to SD",        vendor:"TCS",          stage:"RFS/Live",    days:2  },
  { id:"OQ-18", desc:"Invoice reconciliation tool",             bu:"Finance",    q:"Q1", val:"Efficiency",             dDemand:"Delivered to SD",    dSD:"In Progress",       dDev:"In Progress",       dSIT:"In Progress",  dUAT:"In Progress",     rej:"Accepted to SD",        vendor:"TechM",        stage:"SD",          days:13 },
  { id:"OQ-19", desc:"Budget forecasting module",               bu:"Finance",    q:"Q2", val:"Technology Advancement", dDemand:"Delivered to SD",    dSD:"Completed SD",             dDev:"Delivered to SIT/UAT/EUT", dSIT:"In Progress",  dUAT:"In Progress",     rej:"Accepted to SD",        vendor:"TCS",          stage:"SIT",         days:10 },
  { id:"OQ-20", desc:"Tax compliance reporting engine",         bu:"Finance",    q:"Q3", val:"Efficiency",             dDemand:"Delivered to SD",    dSD:"Completed SD",             dDev:"Delivered to SIT/UAT/EUT", dSIT:"Delivered to UAT",    dUAT:"In Progress",     rej:"Accepted to SD",        vendor:"Ooredoo Team", stage:"UAT",         days:7  },
  { id:"OQ-21", desc:"Cost centre allocation dashboard",        bu:"Finance",    q:"Q3", val:"Efficiency",             dDemand:"In Progress", dSD:"In Progress",       dDev:"In Progress",       dSIT:"In Progress",  dUAT:"In Progress",     rej:"Returned to Demand",  vendor:"TechM",        stage:"Demand",      days:11 },
  { id:"OQ-22", desc:"Procurement approval workflow",           bu:"Finance",    q:"Q4", val:"Efficiency",             dDemand:"Delivered to SD",    dSD:"Completed SD",             dDev:"Delivered to SIT/UAT/EUT", dSIT:"Delivered to UAT",    dUAT:"Delivered to RFS/Live",  rej:"Accepted to SD",        vendor:"TCS",          stage:"RFS/Live",    days:3  },
  { id:"OQ-23", desc:"5G network slice management console",     bu:"Technology", q:"Q1", val:"Technology Advancement", dDemand:"Delivered to SD",    dSD:"Completed SD",             dDev:"Delivered to SIT/UAT/EUT", dSIT:"Delivered to UAT",    dUAT:"Delivered to RFS/Live",  rej:"Accepted to SD",        vendor:"TCS",          stage:"RFS/Live",    days:4  },
  { id:"OQ-24", desc:"Network capacity planning tool",          bu:"Technology", q:"Q2", val:"Technology Advancement", dDemand:"Delivered to SD",    dSD:"In Progress",       dDev:"In Progress",       dSIT:"In Progress",  dUAT:"In Progress",     rej:"Accepted to SD",        vendor:"TechM",        stage:"SD",          days:16 },
  { id:"OQ-25", desc:"Cloud migration orchestration platform",  bu:"Technology", q:"Q2", val:"Technology Advancement", dDemand:"Delivered to SD",    dSD:"Completed SD",             dDev:"In Progress",       dSIT:"In Progress",  dUAT:"In Progress",     rej:"Accepted to SD",        vendor:"TCS",          stage:"Development", days:24 },
  { id:"OQ-26", desc:"DevSecOps pipeline automation",           bu:"Technology", q:"Q3", val:"Technology Advancement", dDemand:"Delivered to SD",    dSD:"Completed SD",             dDev:"Delivered to SIT/UAT/EUT", dSIT:"In Progress",  dUAT:"In Progress",     rej:"Accepted to SD",        vendor:"Ooredoo Team", stage:"SIT",         days:12 },
  { id:"OQ-27", desc:"AI-driven network fault detection",       bu:"Technology", q:"Q4", val:"Technology Advancement", dDemand:"In Progress", dSD:"In Progress",       dDev:"In Progress",       dSIT:"In Progress",  dUAT:"In Progress",     rej:"Returned to Demand",  vendor:"TechM",        stage:"BU",          days:5  },
  { id:"OQ-28", desc:"OSS/BSS integration middleware",          bu:"Technology", q:"Q4", val:"Technology Advancement", dDemand:"Delivered to SD",    dSD:"Completed SD",             dDev:"Delivered to SIT/UAT/EUT", dSIT:"Delivered to UAT",    dUAT:"In Progress",     rej:"Accepted to SD",        vendor:"TCS",          stage:"UAT",         days:9  },
  { id:"OQ-29", desc:"Internal ticketing system upgrade",       bu:"Others",     q:"Q1", val:"Efficiency",             dDemand:"Delivered to SD",    dSD:"Completed SD",             dDev:"Delivered to SIT/UAT/EUT", dSIT:"Delivered to UAT",    dUAT:"Delivered to RFS/Live",  rej:"Accepted to SD",        vendor:"TechM",        stage:"RFS/Live",    days:2  },
  { id:"OQ-30", desc:"HR self-service module",                  bu:"Others",     q:"Q1", val:"Efficiency",             dDemand:"In Progress", dSD:"In Progress",       dDev:"In Progress",       dSIT:"In Progress",  dUAT:"In Progress",     rej:"Returned to Demand",  vendor:"Ooredoo Team", stage:"Demand",      days:9  },
  { id:"OQ-31", desc:"Internal knowledge base platform",        bu:"Others",     q:"Q2", val:"Efficiency",             dDemand:"Delivered to SD",    dSD:"Completed SD",             dDev:"In Progress",       dSIT:"In Progress",  dUAT:"In Progress",     rej:"Accepted to SD",        vendor:"TCS",          stage:"Development", days:20 },
  { id:"OQ-32", desc:"Facilities management portal",            bu:"Others",     q:"Q3", val:"Customer Experience",    dDemand:"Delivered to SD",    dSD:"In Progress",       dDev:"In Progress",       dSIT:"In Progress",  dUAT:"In Progress",     rej:"Accepted to SD",        vendor:"TechM",        stage:"SD",          days:14 },
  { id:"OQ-33", desc:"Vendor performance scorecard",            bu:"Others",     q:"Q4", val:"Efficiency",             dDemand:"Delivered to SD",    dSD:"Completed SD",             dDev:"Delivered to SIT/UAT/EUT", dSIT:"Delivered to UAT",    dUAT:"Delivered to RFS/Live",  rej:"Accepted to SD",        vendor:"TCS",          stage:"RFS/Live",    days:3  },
  { id:"OQ-34", desc:"Customer NPS tracking system",            bu:"Consumer",   q:"Q1", val:"Customer Experience",    dDemand:"Delivered to SD",    dSD:"Completed SD",             dDev:"Delivered to SIT/UAT/EUT", dSIT:"In Progress",  dUAT:"In Progress",     rej:"Accepted to SD",        vendor:"TCS",          stage:"SIT",         days:10 },
  { id:"OQ-35", desc:"eSIM provisioning platform",              bu:"Consumer",   q:"Q2", val:"Technology Advancement", dDemand:"Delivered to SD",    dSD:"Completed SD",             dDev:"Delivered to SIT/UAT/EUT", dSIT:"Delivered to UAT",    dUAT:"Delivered to RFS/Live",  rej:"Accepted to SD",        vendor:"TechM",        stage:"RFS/Live",    days:2  },
  { id:"OQ-36", desc:"Fixed broadband fault tracker",           bu:"Business",   q:"Q3", val:"Customer Experience",    dDemand:"Delivered to SD",    dSD:"In Progress",       dDev:"In Progress",       dSIT:"In Progress",  dUAT:"In Progress",     rej:"Accepted to SD",        vendor:"TCS",          stage:"Development", days:25 },
  { id:"OQ-37", desc:"Treasury management integration",         bu:"Finance",    q:"Q2", val:"Efficiency",             dDemand:"Delivered to SD",    dSD:"Completed SD",             dDev:"Delivered to SIT/UAT/EUT", dSIT:"Delivered to UAT",    dUAT:"Delivered to RFS/Live",  rej:"Accepted to SD",        vendor:"TCS",          stage:"RFS/Live",    days:4  },
  { id:"OQ-38", desc:"SDN controller upgrade",                  bu:"Technology", q:"Q1", val:"Technology Advancement", dDemand:"Delivered to SD",    dSD:"Completed SD",             dDev:"In Progress",       dSIT:"In Progress",  dUAT:"In Progress",     rej:"Accepted to SD",        vendor:"Ooredoo Team", stage:"Development", days:23 },
  { id:"OQ-39", desc:"Employee expense reimbursement app",      bu:"Others",     q:"Q3", val:"Efficiency",             dDemand:"Delivered to SD",    dSD:"Completed SD",             dDev:"Delivered to SIT/UAT/EUT", dSIT:"Delivered to UAT",    dUAT:"In Progress",     rej:"Accepted to SD",        vendor:"TechM",        stage:"UAT",         days:8  },
  { id:"OQ-40", desc:"MVNO management portal",                  bu:"Business",   q:"Q4", val:"Customer Experience",    dDemand:"Delivered to SD",    dSD:"Completed SD",             dDev:"Delivered to SIT/UAT/EUT", dSIT:"Delivered to UAT",    dUAT:"Delivered to RFS/Live",  rej:"Accepted to SD",        vendor:"TCS",          stage:"RFS/Live",    days:3  },
  { id:"OQ-41", desc:"Wholesale interconnect billing",          bu:"Finance",    q:"Q1", val:"Efficiency",             dDemand:"Delivered to SD",    dSD:"In Progress",       dDev:"In Progress",       dSIT:"In Progress",  dUAT:"In Progress",     rej:"Accepted to SD",        vendor:"TechM",        stage:"SD",          days:18 },
  { id:"OQ-42", desc:"Retail POS integration",                  bu:"Consumer",   q:"Q4", val:"Customer Experience",    dDemand:"Delivered to SD",    dSD:"Completed SD",             dDev:"Delivered to SIT/UAT/EUT", dSIT:"Delivered to UAT",    dUAT:"In Progress",     rej:"Accepted to SD",        vendor:"Ooredoo Team", stage:"UAT",         days:7  },
  { id:"OQ-43", desc:"Cloud storage tiering automation",        bu:"Technology", q:"Q3", val:"Technology Advancement", dDemand:"Delivered to SD",    dSD:"Completed SD",             dDev:"Delivered to SIT/UAT/EUT", dSIT:"Delivered to UAT",    dUAT:"Delivered to RFS/Live",  rej:"Accepted to SD",        vendor:"TCS",          stage:"RFS/Live",    days:2  },
  { id:"OQ-44", desc:"Contact centre IVR modernisation",        bu:"Business",   q:"Q2", val:"Customer Experience",    dDemand:"Delivered to SD",    dSD:"Completed SD",             dDev:"Delivered to SIT/UAT/EUT", dSIT:"Delivered to UAT",    dUAT:"Delivered to RFS/Live",  rej:"Accepted to SD",        vendor:"TechM",        stage:"RFS/Live",    days:3  },
  { id:"OQ-45", desc:"Compliance audit trail system",           bu:"Finance",    q:"Q4", val:"Efficiency",             dDemand:"In Progress", dSD:"In Progress",       dDev:"In Progress",       dSIT:"In Progress",  dUAT:"In Progress",     rej:"Returned to Demand",  vendor:"Ooredoo Team", stage:"Demand",      days:10 },
  { id:"OQ-46", desc:"Inventory management system upgrade",     bu:"Others",     q:"Q4", val:"Efficiency",             dDemand:"Delivered to SD",    dSD:"In Progress",       dDev:"In Progress",       dSIT:"In Progress",  dUAT:"In Progress",     rej:"Accepted to SD",        vendor:"TCS",          stage:"SD",          days:15 },
  { id:"OQ-47", desc:"Data lake for analytics platform",        bu:"Technology", q:"Q2", val:"Technology Advancement", dDemand:"Delivered to SD",    dSD:"Completed SD",             dDev:"In Progress",       dSIT:"In Progress",  dUAT:"In Progress",     rej:"Accepted to SD",        vendor:"TCS",          stage:"Development", days:27 },
  { id:"OQ-48", desc:"Omnichannel notification hub",            bu:"Consumer",   q:"Q2", val:"Customer Experience",    dDemand:"Delivered to SD",    dSD:"Completed SD",             dDev:"Delivered to SIT/UAT/EUT", dSIT:"Delivered to UAT",    dUAT:"Delivered to RFS/Live",  rej:"Accepted to SD",        vendor:"TechM",        stage:"RFS/Live",    days:2  },
  { id:"OQ-49", desc:"Carrier billing gateway",                 bu:"Business",   q:"Q1", val:"Efficiency",             dDemand:"Delivered to SD",    dSD:"Completed SD",             dDev:"Delivered to SIT/UAT/EUT", dSIT:"In Progress",  dUAT:"In Progress",     rej:"Accepted to SD",        vendor:"TCS",          stage:"SIT",         days:13 },
  { id:"OQ-50", desc:"Real-time fraud detection engine",        bu:"Finance",    q:"Q3", val:"Technology Advancement", dDemand:"Delivered to SD",    dSD:"Completed SD",             dDev:"Delivered to SIT/UAT/EUT", dSIT:"Delivered to UAT",    dUAT:"Delivered to RFS/Live",  rej:"Accepted to SD",        vendor:"TCS",          stage:"RFS/Live",    days:3  },
];
const VALUE_COLORS    = { "Customer Experience": "#2563EB", "Efficiency": "#7C3AED", "Technology Advancement": "#F97316" };
const VALUE_ICONS     = { "Customer Experience": "👤", "Efficiency": "⚡", "Technology Advancement": "🔬" };
const DELIVERY_COLORS = { "Delivered to UAT": "#16A34A", "In Progress": "#EAB308" };
const DELIVERY_ICONS  = { "Delivered to UAT": "✅", "In Progress": "🔄" };
const SD_COLORS       = { "Completed SD": "#16A34A", "In Progress": "#EAB308" };
const SD_ICONS        = { "Completed SD": "✅", "In Progress": "🔄" };
const REJECTED_COLORS  = { "Accepted to SD": "#16A34A", "Returned to Demand": "#EAB308" };
const REJECTED_ICONS   = { "Accepted to SD": "✅", "Returned to Demand": "🔄" };
const DEL_DEMAND_COLORS = { "Delivered to SD": "#16A34A", "In Progress": "#EAB308" };
const DEL_DEMAND_ICONS  = { "Delivered to SD": "✅", "In Progress": "🔄" };
const DEL_DEV_COLORS    = { "Delivered to SIT/UAT/EUT": "#16A34A", "In Progress": "#EAB308" };
const DEL_DEV_ICONS     = { "Delivered to SIT/UAT/EUT": "✅", "In Progress": "🔄" };
const DEL_UAT_COLORS    = { "Delivered to RFS/Live": "#16A34A", "In Progress": "#EAB308" };
const DEL_UAT_ICONS     = { "Delivered to RFS/Live": "✅", "In Progress": "🔄" };
const RETURNED_COLORS   = { "Returned": "#EF4444", "Not Returned": "#16A34A" };
const RETURNED_ICONS    = { "Returned": "↩️", "Not Returned": "✅" };
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
const SliceLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, pct, minPct = 10 }) => {
  if (pct < minPct) return null;
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
const ReturnedTooltip   = makeTooltip(RETURNED_COLORS);

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
const DonutCard = ({ title, subtitle, chartData, total, animKey, tooltipContent, icons, showLegend = true, bp, statusData, extraStats, labelMinPct = 10 }) => {
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
                label={(props) => <SliceLabel {...props} pct={parseFloat(chartData[props.index]?.pct)} minPct={labelMinPct} />}
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

        {/* Dot-only legend + extra stats */}
        {!showLegend && (
          <div style={{ display: "flex", flexDirection: "column", gap: 8, flex: 1, minWidth: 0 }}>
            {chartData.map(item => (
              <div key={item.name} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <div style={{ width: 9, height: 9, borderRadius: "50%", background: item.color, flexShrink: 0 }} />
                <span style={{ fontSize: 11, color: "#6B7280", fontWeight: 500, whiteSpace: "nowrap" }}>{item.name}</span>
              </div>
            ))}

        </div>
        )}

        {/* Full legend with bars + optional status mini-bars */}
        {showLegend && (
          <div style={{ flex: 1, minWidth: 0 }}>
            {chartData.map(item => {
              const st       = statusData?.[item.name];
              const live     = st?.["RFS/Live"]    ?? 0;
              const inProg   = st?.["In Progress"] ?? 0;
              const stTotal  = live + inProg;
              const livePct  = stTotal > 0 ? Math.round((live    / stTotal) * 100) : 0;
              const inPct    = stTotal > 0 ? Math.round((inProg  / stTotal) * 100) : 0;

              return (
                <div key={item.name} style={{ marginBottom: statusData ? 14 : 10 }}>
                  {/* Row 1: colour dot + name + total */}
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: statusData ? 6 : 3 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                      <div style={{ width: 9, height: 9, borderRadius: "50%", background: item.color, flexShrink: 0 }} />
                      <span style={{ fontSize: 11 }}>{icons[item.name]}</span>
                      <span style={{ fontSize: 10, color: "#6B7280" }}>{item.name}</span>
                    </div>
                    <div>
                      <span style={{ fontSize: 12, fontWeight: 700, color: "#111827" }}>{item.value}</span>
                    </div>
                  </div>

                  {/* Mini Live / In Progress bar only */}
                  {statusData && stTotal > 0 && (
                    <div>
                      {/* Labels row */}
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 3 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 3 }}>
                          <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#16A34A", flexShrink: 0 }} />
                          <span style={{ fontSize: 9, color: "#16A34A", fontWeight: 600 }}>RFS/Live {livePct}% ({live})</span>
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: 3 }}>
                          <span style={{ fontSize: 9, color: "#F59E0B", fontWeight: 600 }}>In Progress {inPct}% ({inProg})</span>
                          <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#F59E0B", flexShrink: 0 }} />
                        </div>
                      </div>
                      {/* Dual-colour mini bar */}
                      <div style={{ height: 5, background: "#F3F4F6", borderRadius: 99, overflow: "hidden", display: "flex" }}>
                        <div style={{ height: "100%", width: `${livePct}%`, background: "#16A34A", borderRadius: "99px 0 0 99px", transition: "width 0.5s ease" }} />
                        <div style={{ height: "100%", width: `${inPct}%`, background: "#F59E0B", borderRadius: "0 99px 99px 0", transition: "width 0.5s ease" }} />
                      </div>
                    </div>
                  )}

                  {/* Fallback bar when no statusData */}
                  {!statusData && (
                    <div style={{ height: 4, background: "#F3F4F6", borderRadius: 99, overflow: "hidden" }}>
                      <div style={{ height: "100%", width: `${item.pct}%`, background: item.color, borderRadius: 99, transition: "width 0.5s ease" }} />
                    </div>
                  )}
                </div>
              );
            })}

            {/* Mini bar legend key */}
            {statusData && (
              <div style={{ display: "flex", gap: 12, marginTop: 4 }}>
                {[["#16A34A","RFS/Live"],["#F59E0B","In Progress"]].map(([color, label]) => (
                  <div key={label} style={{ display: "flex", alignItems: "center", gap: 4 }}>
                    <div style={{ width: 7, height: 7, borderRadius: "50%", background: color }} />
                    <span style={{ fontSize: 9, color: "#6B7280", fontWeight: 500 }}>{label}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

/* ══════════════════════════════════════════
   BU PROGRESS TABLE (reusable)
══════════════════════════════════════════ */
const BUProgressTable = ({ title, subtitle, jiraData, completedKey, inProgKey, completedLabel, inProgLabel, activeQuarters, isMobile, completedColor = "#16A34A", inProgColor = "#EAB308" }) => {
  const cols = isMobile ? "80px 1fr" : "130px 1fr 90px";
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
        {!isMobile && <div style={{ fontSize: 10, fontWeight: 600, color: "#9CA3AF", textTransform: "uppercase", letterSpacing: "0.07em", textAlign: "right" }}>Total</div>}
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
            {/* Progress bar + counts */}
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                <span style={{ fontSize: 10, color: completedColor, fontWeight: 600 }}>{completedLabel} {pct}% <span style={{ fontSize: 9, fontWeight: 500, color: "#16A34A", opacity: 0.8 }}>({completed})</span></span>
                <span style={{ fontSize: 10, color: inProgColor, fontWeight: 600 }}>{inProgLabel} {100 - pct}% <span style={{ fontSize: 9, fontWeight: 500, color: "#EAB308", opacity: 0.8 }}>({inProg})</span></span>
              </div>
              <div style={{ height: 7, background: "#F3F4F6", borderRadius: 99, overflow: "hidden", position: "relative" }}>
                <div style={{ position: "absolute", left: 0, top: 0, height: "100%", width: `${pct}%`, background: completedColor, borderRadius: 99, transition: "width 0.5s ease" }} />
                <div style={{ position: "absolute", left: `${pct}%`, top: 0, height: "100%", width: `${100 - pct}%`, background: inProgColor, borderRadius: 99, transition: "all 0.5s ease" }} />
              </div>
            </div>
            {/* Total count — desktop only */}
            {!isMobile && (
              <div style={{ textAlign: "right" }}>
                <span style={{ fontSize: 13, fontWeight: 800, color: "#111827" }}>{total}</span>
                <div style={{ fontSize: 9, color: "#9CA3AF" }}>DRFs</div>
              </div>
            )}
          </div>
        );
      })}

      {/* Grand total row */}
      <div style={{ marginTop: 12, paddingTop: 12, borderTop: "1px solid #F3F4F6", display: "grid", gridTemplateColumns: cols, gap, alignItems: "center" }}>
        <div style={{ fontSize: isMobile ? 11 : 12, fontWeight: 700, color: "#111827" }}>All BUs</div>
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
            <span style={{ fontSize: 10, color: completedColor, fontWeight: 700 }}>{completedLabel} {grandPct}% <span style={{ fontSize: 9, fontWeight: 600, color: "#16A34A", opacity: 0.85 }}>({grandCompleted})</span></span>
            <span style={{ fontSize: 10, color: inProgColor, fontWeight: 700 }}>{inProgLabel} {100 - grandPct}% <span style={{ fontSize: 9, fontWeight: 600, color: "#EAB308", opacity: 0.85 }}>({grandInProg})</span></span>
          </div>
          <div style={{ height: 7, background: "#F3F4F6", borderRadius: 99, overflow: "hidden", position: "relative" }}>
            <div style={{ position: "absolute", left: 0, top: 0, height: "100%", width: `${grandPct}%`, background: completedColor, borderRadius: 99 }} />
            <div style={{ position: "absolute", left: `${grandPct}%`, top: 0, height: "100%", width: `${100 - grandPct}%`, background: inProgColor, borderRadius: 99 }} />
          </div>
        </div>
        {!isMobile && (
          <div style={{ textAlign: "right" }}>
            <span style={{ fontSize: 14, fontWeight: 800, color: "#111827" }}>{grandTotal}</span>
            <div style={{ fontSize: 9, color: "#9CA3AF" }}>Total DRFs</div>
          </div>
        )}
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

  // RFS/Live vs In Progress per value type
  const valueStatusData = activeDRF ? null : (() => {
    const result = {};
    ["Customer Experience", "Efficiency", "Technology Advancement"].forEach(type => {
      result[type] = {
        "RFS/Live":    activeQuarters.reduce((s, q) => s + JIRA_VALUE_STATUS[activeBu][q][type]["RFS/Live"],    0),
        "In Progress": activeQuarters.reduce((s, q) => s + JIRA_VALUE_STATUS[activeBu][q][type]["In Progress"], 0),
      };
    });
    return result;
  })();

  const rawDel = activeDRF
    ? { "Delivered to UAT": activeDRF.dSIT === "Delivered to UAT" ? 1 : 0, "In Progress": activeDRF.dSIT === "In Progress" ? 1 : 0 }
    : sumAcross(JIRA_DELIVERY, ["Delivered to UAT", "In Progress"]);
  const totalDel      = Object.values(rawDel).reduce((s, v) => s + v, 0);
  const delData       = Object.entries(rawDel).map(([n, v]) => ({ name: n === "Delivered to UAT" ? "Delivered" : n, value: v, color: DELIVERY_COLORS[n], pct: totalDel > 0 ? ((v / totalDel) * 100).toFixed(1) : "0.0" }));

  const rawSD = activeDRF
    ? { "Completed SD": activeDRF.dSD === "Completed SD" ? 1 : 0, "In Progress": activeDRF.dSD === "In Progress" ? 1 : 0 }
    : sumAcross(JIRA_DELIVERY_SD, ["Completed SD", "In Progress"]);
  const totalSD       = Object.values(rawSD).reduce((s, v) => s + v, 0);
  const sdData        = Object.entries(rawSD).map(([n, v]) => ({ name: n === "Completed SD" ? "Delivered" : n, value: v, color: SD_COLORS[n], pct: totalSD > 0 ? ((v / totalSD) * 100).toFixed(1) : "0.0" }));

  const rawRej = activeDRF
    ? { "Accepted to SD": activeDRF.rej === "Accepted to SD" ? 1 : 0, "Returned to Demand": activeDRF.rej === "Returned to Demand" ? 1 : 0 }
    : sumAcross(JIRA_REJECTED, ["Accepted to SD", "Returned to Demand"]);
  const totalRej      = Object.values(rawRej).reduce((s, v) => s + v, 0);
  const rejectedData  = Object.entries(rawRej).map(([n, v]) => ({ name: n, value: v, color: REJECTED_COLORS[n], pct: totalRej > 0 ? ((v / totalRej) * 100).toFixed(1) : "0.0" }));

  const rawDelDemand = activeDRF
    ? { "Delivered to SD": activeDRF.dDemand === "Delivered to SD" ? 1 : 0, "In Progress": activeDRF.dDemand === "In Progress" ? 1 : 0 }
    : sumAcross(JIRA_DEL_DEMAND, ["Delivered to SD", "In Progress"]);
  const totalDelDemand = Object.values(rawDelDemand).reduce((s, v) => s + v, 0);
  const delDemandData  = Object.entries(rawDelDemand).map(([n, v]) => ({ name: n === "Delivered to SD" ? "Delivered" : n, value: v, color: DEL_DEMAND_COLORS[n], pct: totalDelDemand > 0 ? ((v / totalDelDemand) * 100).toFixed(1) : "0.0" }));

  const rawDelDev = activeDRF
    ? { "Delivered to SIT/UAT/EUT": activeDRF.dDev === "Delivered to SIT/UAT/EUT" ? 1 : 0, "In Progress": activeDRF.dDev === "In Progress" ? 1 : 0 }
    : sumAcross(JIRA_DEL_DEV, ["Delivered to SIT/UAT/EUT", "In Progress"]);
  const totalDelDev   = Object.values(rawDelDev).reduce((s, v) => s + v, 0);
  const delDevData    = Object.entries(rawDelDev).map(([n, v]) => ({ name: n === "Delivered to SIT/UAT/EUT" ? "Delivered" : n, value: v, color: DEL_DEV_COLORS[n], pct: totalDelDev > 0 ? ((v / totalDelDev) * 100).toFixed(1) : "0.0" }));

  const rawDelUAT = activeDRF
    ? { "Delivered to RFS/Live": activeDRF.dUAT === "Delivered to RFS/Live" ? 1 : 0, "In Progress": activeDRF.dUAT === "In Progress" ? 1 : 0 }
    : sumAcross(JIRA_DEL_UAT, ["Delivered to RFS/Live", "In Progress"]);
  const totalDelUAT   = Object.values(rawDelUAT).reduce((s, v) => s + v, 0);
  const delUATData    = Object.entries(rawDelUAT).map(([n, v]) => ({ name: n, value: v, color: DEL_UAT_COLORS[n], pct: totalDelUAT > 0 ? ((v / totalDelUAT) * 100).toFixed(1) : "0.0" }));

  // Returned-from stats for Delivery % Development and Delivery % to SIT cards
  const devReturnedStats = activeDRF ? null : (() => {
    const r = activeQuarters.reduce((s, q) => s + JIRA_DEV_RETURNED[activeBu][q]["Returned"], 0);
    const t = activeQuarters.reduce((s, q) => s + JIRA_DEV_RETURNED[activeBu][q]["Returned"] + JIRA_DEV_RETURNED[activeBu][q]["Not Returned"], 0);
    return [{ label: "Returned from Development", returned: r, total: t, color: "#EF4444" }];
  })();

  const sitReturnedStats = activeDRF ? null : (() => {
    const rSIT = activeQuarters.reduce((s, q) => s + JIRA_SIT_RETURNED[activeBu][q]["Returned"], 0);
    const tSIT = activeQuarters.reduce((s, q) => s + JIRA_SIT_RETURNED[activeBu][q]["Returned"] + JIRA_SIT_RETURNED[activeBu][q]["Not Returned"], 0);
    const rUAT = activeQuarters.reduce((s, q) => s + JIRA_UAT_RETURNED[activeBu][q]["Returned"], 0);
    const tUAT = activeQuarters.reduce((s, q) => s + JIRA_UAT_RETURNED[activeBu][q]["Returned"] + JIRA_UAT_RETURNED[activeBu][q]["Not Returned"], 0);
    return [
      { label: "Returned from SIT", returned: rSIT, total: tSIT, color: "#EF4444" },
      { label: "Returned from UAT", returned: rUAT, total: tUAT, color: "#DC2626" },
    ];
  })();

  // Returned donut chart data
  const rawDevReturned  = sumAcross(JIRA_DEV_RETURNED, ["Not Returned", "Returned", "Returned to Demand"]);
  const totalDevRet     = Object.values(rawDevReturned).reduce((s, v) => s + v, 0);
  const devRetData      = Object.entries(rawDevReturned).map(([n, v]) => ({
    name:  n === "Returned" ? "Returned to SD" : n === "Returned to Demand" ? "Returned to Demand" : "Accepted to Delivery",
    value: v,
    color: n === "Returned" ? "#EAB308" : n === "Returned to Demand" ? "#EF4444" : "#16A34A",
    pct:   totalDevRet > 0 ? ((v / totalDevRet) * 100).toFixed(1) : "0.0"
  }));

  const rawSITReturned  = sumAcross(JIRA_SIT_RETURNED, ["Not Returned", "Returned", "Returned to SD", "Returned to Demand"]);
  const totalSITRet     = Object.values(rawSITReturned).reduce((s, v) => s + v, 0);
  const sitRetData      = Object.entries(rawSITReturned).map(([n, v]) => ({
    name:  n === "Returned" ? "Returned to Development" : n === "Returned to SD" ? "Returned to SD" : n === "Returned to Demand" ? "Returned to Demand" : "Accepted to Delivery",
    value: v,
    color: n === "Returned" ? "#EAB308" : n === "Returned to SD" ? "#F97316" : n === "Returned to Demand" ? "#EF4444" : "#16A34A",
    pct:   totalSITRet > 0 ? ((v / totalSITRet) * 100).toFixed(1) : "0.0"
  }));

  const rawUATReturned  = sumAcross(JIRA_UAT_RETURNED, ["Not Returned", "Returned", "Returned to Development", "Returned to SD", "Returned to Demand"]);
  const totalUATRet     = Object.values(rawUATReturned).reduce((s, v) => s + v, 0);
  const uatRetData      = Object.entries(rawUATReturned).map(([n, v]) => ({
    name:  n === "Returned" ? "Returned to SIT" : n === "Returned to Development" ? "Returned to Development" : n === "Returned to SD" ? "Returned to SD" : n === "Returned to Demand" ? "Returned to Demand" : "Accepted UAT delivery",
    value: v,
    color: n === "Returned" ? "#EAB308" : n === "Returned to Development" ? "#F97316" : n === "Returned to SD" ? "#EF4444" : n === "Returned to Demand" ? "#DC2626" : "#16A34A",
    pct:   totalUATRet > 0 ? ((v / totalUATRet) * 100).toFixed(1) : "0.0"
  }));

  const vendorStackData = activeDRF
    ? [{ vendor: activeDRF.vendor, Consumer: 0, Business: 0, Finance: 0, Technology: 0, Others: 0, [activeDRF.bu]: 1 }]
    : ["TCS", "TechM", "Ooredoo Team"].map(vendor => {
        const entry = { vendor };
        BU_STACK_KEYS.forEach(b => { entry[b] = activeQuarters.reduce((s, q) => s + JIRA_VENDOR[b][q][vendor], 0); });
        return entry;
      });

  /* BU table data: override with single-DRF fake datasets when searching */
  const buDemandData  = activeDRF ? makeDrfBuData("Delivered to SD",         "In Progress",       activeDRF.dDemand  === "Delivered to SD")          : JIRA_DEL_DEMAND;
  const buSdData      = activeDRF ? makeDrfBuData("Completed SD",             "In Progress",       activeDRF.dSD      === "Completed SD")              : JIRA_DELIVERY_SD;
  const buDevData     = activeDRF ? makeDrfBuData("Delivered to SIT/UAT/EUT", "In Progress",       activeDRF.dDev     === "Delivered to SIT/UAT/EUT")  : JIRA_DEL_DEV;
  const buSitData     = activeDRF ? makeDrfBuData("Delivered to UAT",         "In Progress",       activeDRF.dSIT     === "Delivered to UAT")          : JIRA_DELIVERY;
  const buUatData     = activeDRF ? makeDrfBuData("Delivered to RFS/Live",    "In Progress",       activeDRF.dUAT     === "Delivered to RFS/Live")     : JIRA_DEL_UAT;
  const buLiveData    = activeDRF ? makeDrfBuData("Delivered to Live",         "In Progress",       activeDRF.dUAT     === "Delivered to RFS/Live")     : JIRA_DEL_LIVE;

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
          <div style={{ display: "flex", gap: 6, alignItems: "center", flexWrap: "wrap", justifyContent: isMobile ? "flex-start" : "flex-end", width: isMobile ? "100%" : "auto" }}>
            {/* Search box */}
            <div style={{ position: "relative", display: "flex", alignItems: "center", flex: isMobile ? 1 : "none" }}>
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
                  color: "#374151", outline: "none", width: isMobile ? "100%" : 260, fontFamily: "'DM Sans', sans-serif",
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
      <div style={{ padding: `${isMobile ? "14px" : "22px"} ${px} 0`, display: "grid", gridTemplateColumns: `repeat(${isMobile ? 1 : isTablet ? 2 : 3}, 1fr)`, gap: isMobile ? 10 : 14 }}>
        <DonutCard title="Value of Request"       subtitle="Distribution of DRFs by strategic value category"                     chartData={valueData}     total={totalValue}     animKey={`val-${animKey}`}  tooltipContent={<ValueTooltip />}     icons={VALUE_ICONS}      showLegend={true}  bp={bp} statusData={valueStatusData} />
        <DonutCard title="Delivery % Demand"      subtitle="% of demand DRF's delivered to SD & beyond"                            chartData={delDemandData}  total={totalDelDemand} animKey={`dmd-${animKey}`}  tooltipContent={<DelDemandTooltip />} icons={DEL_DEMAND_ICONS} showLegend={false} bp={bp} />
        <DonutCard title="Delivery % SD"          subtitle="% of DRF's solution design completed & beyond"                          chartData={sdData}        total={totalSD}        animKey={`sd-${animKey}`}   tooltipContent={<SDTooltip />}        icons={SD_ICONS}         showLegend={false} bp={bp} />
        <DonutCard title="% DRF Returned (SD)"         subtitle="% of DRF returned from SD to demand within SD month" chartData={rejectedData}  total={totalRej}       animKey={`rej-${animKey}`}  tooltipContent={<RejectedTooltip />}  icons={REJECTED_ICONS}   showLegend={false} bp={bp} />
        <DonutCard title="Delivery % Development" subtitle="% DRF's development delivered to SIT & beyond (Including EUT)"                  chartData={delDevData}    total={totalDelDev}    animKey={`dev-${animKey}`}  tooltipContent={<DelDevTooltip />}    icons={DEL_DEV_ICONS}    showLegend={false} bp={bp} />
        <DonutCard title="% DRF Returned (Development)" labelMinPct={3} labelMinPct={4} subtitle="% of DRF returned from Development to Demand/SD within delivery monthly scope"      chartData={devRetData}    total={totalDevRet}    animKey={`dret-${animKey}`} tooltipContent={<ReturnedTooltip />}  icons={RETURNED_ICONS}   showLegend={false} bp={bp} />
        <DonutCard title="Delivery % to SIT"      subtitle="% DRF's delivered from SIT to UAT & beyond"                  chartData={delData}       total={totalDel}       animKey={`del-${animKey}`}  tooltipContent={<DeliveryTooltip />}  icons={DELIVERY_ICONS}   showLegend={false} bp={bp} />
        <DonutCard title="% DRF Returned (SIT)" labelMinPct={3} labelMinPct={4}        subtitle="% of DRF returned from SIT to Demand/SD/Development within delivery monthly scope"              chartData={sitRetData}    total={totalSITRet}    animKey={`sret-${animKey}`} tooltipContent={<ReturnedTooltip />}  icons={RETURNED_ICONS}   showLegend={false} bp={bp} />
        <DonutCard title="% DRF Returned (UAT)" labelMinPct={3} labelMinPct={4}        subtitle="% of DRF returned from UAT to Demand/SD/Development/SIT"              chartData={uatRetData}    total={totalUATRet}    animKey={`urat-${animKey}`} tooltipContent={<ReturnedTooltip />}  icons={RETURNED_ICONS}   showLegend={false} bp={bp} />
      </div>

      {/* ── BU PROGRESS TABLES GRID (items 8–12) ── */}
      <div style={{ padding: `${isMobile ? "12px" : "20px"} ${px} 0` }}>
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: isMobile ? 10 : 14 }}>
          <BUProgressTable
            title="Delivery % Demand by Business Unit"
            subtitle="% of demand DRF's delivered to SD & beyond, broken down per BU"
            jiraData={buDemandData}
            completedKey="Delivered to SD"
            inProgKey="In Progress"
            completedLabel="Delivered"
            inProgLabel="In Progress"
            activeQuarters={activeQuarters}
            isMobile={isMobile}
          />
          <BUProgressTable
            title="Delivery % SD by Business Unit"
            subtitle="% of DRF's solution design completed & beyond, broken down per BU"
            jiraData={buSdData}
            completedKey="Completed SD"
            inProgKey="In Progress"
            completedLabel="Completed"
            inProgLabel="In Progress"
            activeQuarters={activeQuarters}
            isMobile={isMobile}
          />
          <BUProgressTable
            title="Delivery % Development by Business Unit"
            subtitle="% DRF's development delivered to SIT & beyond (Including EUT), per BU"
            jiraData={buDevData}
            completedKey="Delivered to SIT/UAT/EUT"
            inProgKey="In Progress"
            completedLabel="Delivered"
            inProgLabel="In Progress"
            activeQuarters={activeQuarters}
            isMobile={isMobile}
          />
          <BUProgressTable
            title="Delivery % to SIT by Business Unit"
            subtitle="% DRF's delivered from SIT to UAT & beyond, per BU"
            jiraData={buSitData}
            completedKey="Delivered to UAT"
            inProgKey="In Progress"
            completedLabel="Delivered"
            inProgLabel="In Progress"
            activeQuarters={activeQuarters}
            isMobile={isMobile}
          />
          <BUProgressTable
            title="Delivery % UAT by Business Unit"
            subtitle="DRFs signed off and delivered to RFS or Live, per BU"
            jiraData={buUatData}
            completedKey="Delivered to RFS/Live"
            inProgKey="In Progress"
            completedLabel="Delivered"
            inProgLabel="In Progress"
            activeQuarters={activeQuarters}
            isMobile={isMobile}
          />
          <BUProgressTable
            title="Delivery % Live by Business Unit"
            subtitle="DRFs confirmed live in production, per BU"
            jiraData={buLiveData}
            completedKey="Delivered to Live"
            inProgKey="In Progress"
            completedLabel="Live"
            inProgLabel="In Progress"
            activeQuarters={activeQuarters}
            isMobile={isMobile}
          />

        </div>
      </div>


      {/* ── VENDOR IMPACT DISTRIBUTION ── */}
      <div style={{ padding: `${isMobile ? "12px" : "20px"} ${px} 0` }}>
        <div style={{ background: "#fff", borderRadius: 14, padding: cardPad, boxShadow: "0 1px 4px rgba(0,0,0,0.05)" }}>

          {/* Header */}
          <div style={{ marginBottom: isMobile ? 16 : 22 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: "#111827" }}>ITMS Distribution</div>
            <div style={{ fontSize: 10, color: "#9CA3AF", marginTop: 3 }}>% of IT systems under IT MS vs Non-IT MS</div>
          </div>

          {(() => {
            const VENDORS = ["TCS", "TechM", "Ooredoo Team"];
            const vendorTotals = VENDORS.map(v => ({
              name: v,
              value: BU_STACK_KEYS.reduce((s, b) => s + activeQuarters.reduce((ss, q) => ss + JIRA_VENDOR[b][q][v], 0), 0),
              color: VENDOR_COLORS[v],
            }));
            const grandTotal = vendorTotals.reduce((s, v) => s + v.value, 0);
            const vendorData = vendorTotals.map(v => ({ ...v, pct: grandTotal > 0 ? +((v.value / grandTotal) * 100).toFixed(1) : 0 }));

            const donutOuter = isMobile ? 90 : isTablet ? 110 : 130;
            const donutInner = isMobile ? 52 : isTablet ? 64 : 76;
            const chartSize  = donutOuter * 2 + 20;

            const VENDOR_ICONS = { TCS: "🏢", TechM: "🔷", "Ooredoo Team": "🟠" };

            return (
              <div style={{ display: "flex", flexDirection: isMobile ? "column" : "row", alignItems: isMobile ? "stretch" : "center", gap: isMobile ? 20 : 28 }}>

                {/* Donut — centered on mobile, fixed width on larger screens */}
                <div style={{ display: "flex", justifyContent: "center", flexShrink: 0 }}>
                  <div style={{ position: "relative", width: chartSize, height: chartSize }}>
                    <PieChart width={chartSize} height={chartSize}>
                      <Pie
                        key={`vid-${animKey}`}
                        data={vendorData}
                        cx={chartSize / 2 - 1}
                        cy={chartSize / 2 - 1}
                        innerRadius={donutInner}
                        outerRadius={donutOuter}
                        dataKey="value"
                        startAngle={90}
                        endAngle={-270}
                        paddingAngle={2}
                        isAnimationActive={true}
                        labelLine={false}
                        label={({ cx, cy, midAngle, innerRadius, outerRadius, pct }) => {
                          if (pct < 5) return null;
                          const r = innerRadius + (outerRadius - innerRadius) * 0.55;
                          const x = cx + r * Math.cos(-midAngle * RADIAN);
                          const y = cy + r * Math.sin(-midAngle * RADIAN);
                          return (
                            <text x={x} y={y} textAnchor="middle" dominantBaseline="central"
                              fontSize={isMobile ? 11 : 13} fontWeight={800} fill="#fff">
                              {pct}%
                            </text>
                          );
                        }}
                      >
                        {vendorData.map((entry, i) => (
                          <Cell key={i} fill={entry.color} stroke="none" />
                        ))}
                      </Pie>
                      <Tooltip
                        formatter={(val, name) => [`${val} systems`, name]}
                        contentStyle={{ fontSize: 11, borderRadius: 8, border: "1px solid #E5E7EB", fontFamily: "inherit" }}
                      />
                    </PieChart>
                    {/* Centre label */}
                    <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", textAlign: "center", pointerEvents: "none", width: donutInner * 1.6 }}>
                      <div style={{ fontSize: isMobile ? 18 : 24, fontWeight: 800, color: "#111827", lineHeight: 1 }}>{grandTotal}</div>
                      <div style={{ fontSize: 8, color: "#9CA3AF", fontWeight: 500, marginTop: 3, lineHeight: 1.3 }}>Total Systems</div>
                    </div>
                  </div>
                </div>

                {/* Legend bars — full width, flex column */}
                <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", gap: isMobile ? 14 : 16 }}>
                  {vendorData.map(v => (
                    <div key={v.name}>
                      {/* Name + count row */}
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
                          <div style={{ width: 10, height: 10, borderRadius: "50%", background: v.color, flexShrink: 0 }} />
                          <span style={{ fontSize: isMobile ? 11 : 12, fontWeight: 600, color: "#374151" }}>{VENDOR_ICONS[v.name]} {v.name}</span>
                        </div>
                        <div style={{ display: "flex", alignItems: "baseline", gap: 6 }}>
                          <span style={{ fontSize: isMobile ? 14 : 16, fontWeight: 800, color: v.color, lineHeight: 1 }}>{v.value}</span>
                          <span style={{ fontSize: 10, color: "#9CA3AF", fontWeight: 500 }}>{v.pct}%</span>
                        </div>
                      </div>
                      {/* Bar */}
                      <div style={{ height: isMobile ? 7 : 8, background: "#F3F4F6", borderRadius: 99, overflow: "hidden" }}>
                        <div style={{ height: "100%", width: `${v.pct}%`, background: v.color, borderRadius: 99, transition: "width 0.5s ease" }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })()}
        </div>
      </div>

      {/* ── IMPACTED REQUEST LEAD BY (item 13) ── */}
      <div style={{ padding: `${isMobile ? "12px" : "20px"} ${px} 0` }}>
        <div style={{ background: "#fff", borderRadius: 14, padding: cardPad, boxShadow: "0 1px 4px rgba(0,0,0,0.05)" }}>

          {/* Card header */}
          <div style={{ marginBottom: 14, display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexDirection: isDesktop ? "row" : "column", gap: 8 }}>
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, color: "#111827" }}>DRF Lead By</div>
              <div style={{ fontSize: 10, color: "#9CA3AF", marginTop: 3, fontWeight: 400 }}>Total DRF volume lead by ITMS vs Non ITMS</div>
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
            <div style={{ fontSize: 13, fontWeight: 700, color: "#111827" }}>Development Delivery ITMS vs non ITMS</div>
            <div style={{ fontSize: 10, color: "#9CA3AF", marginTop: 3 }}>% DRF Delivered vs In Progress to UAT by ITMS vs non ITMS to UAT</div>
          </div>

          {/* Column headers */}
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "90px 1fr 52px" : "140px 1fr 140px", gap: isMobile ? 8 : 12, alignItems: "center", marginBottom: 10, paddingBottom: 8, borderBottom: "1px solid #F3F4F6" }}>
            <div style={{ fontSize: 10, fontWeight: 600, color: "#9CA3AF", textTransform: "uppercase", letterSpacing: "0.07em" }}>Vendor</div>
            <div style={{ fontSize: 10, fontWeight: 600, color: "#9CA3AF", textTransform: "uppercase", letterSpacing: "0.07em" }}>Progress</div>
            <div style={{ fontSize: 10, fontWeight: 600, color: "#9CA3AF", textTransform: "uppercase", letterSpacing: "0.07em", textAlign: "right" }}>Total</div>
          </div>

          {/* Vendor rows */}
          {["TCS", "TechM", "Ooredoo Team"].map((vendor, idx) => {
            const delivered = activeQuarters.reduce((s, q) => s + JIRA_VENDOR_UAT[bu][q][vendor]["Delivered to UAT"], 0);
            const missed    = activeQuarters.reduce((s, q) => s + JIRA_VENDOR_UAT[bu][q][vendor]["In Progress"], 0);
            const total     = delivered + missed;
            const pct       = total > 0 ? Math.round((delivered / total) * 100) : 0;
            return (
              <div key={vendor} style={{ display: "grid", gridTemplateColumns: isMobile ? "90px 1fr 52px" : "140px 1fr 140px", gap: isMobile ? 8 : 12, alignItems: "center", padding: "12px 0", borderBottom: idx < 2 ? "1px solid #F9FAFB" : "none" }}>

                {/* Vendor name + colour dot */}
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <div style={{ width: 8, height: 8, borderRadius: "50%", background: VENDOR_COLORS[vendor], flexShrink: 0 }} />
                  <span style={{ fontSize: isMobile ? 11 : 12, fontWeight: 600, color: "#374151" }}>{vendor}</span>
                </div>

                {/* Progress bar + counts inline */}
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                    <span style={{ fontSize: 10, color: "#16A34A", fontWeight: 600 }}>Delivered {pct}% <span style={{ fontSize: 9, opacity: 0.8 }}>({delivered})</span></span>
                    <span style={{ fontSize: 10, color: "#EAB308", fontWeight: 600 }}>In Progress {100 - pct}% <span style={{ fontSize: 9, opacity: 0.8 }}>({missed})</span></span>
                  </div>
                  <div style={{ height: 7, background: "#F3F4F6", borderRadius: 99, overflow: "hidden", position: "relative" }}>
                    <div style={{ position: "absolute", left: 0, top: 0, height: "100%", width: `${pct}%`, background: "#16A34A", borderRadius: 99, transition: "width 0.5s ease" }} />
                    <div style={{ position: "absolute", left: `${pct}%`, top: 0, height: "100%", width: `${100 - pct}%`, background: "#EAB308", borderRadius: 99, transition: "all 0.5s ease" }} />
                  </div>
                </div>

                {/* Total */}
                <div style={{ textAlign: "right" }}>
                  <span style={{ fontSize: isMobile ? 12 : 13, fontWeight: 800, color: "#111827" }}>{total}</span>
                  <div style={{ fontSize: 9, color: "#9CA3AF" }}>DRFs</div>
                </div>
              </div>
            );
          })}

          {/* Grand total row */}
          {(() => {
            const grandDel   = ["TCS", "TechM", "Ooredoo Team"].reduce((s, v) => s + activeQuarters.reduce((ss, q) => ss + JIRA_VENDOR_UAT[bu][q][v]["Delivered to UAT"], 0), 0);
            const grandMissed= ["TCS", "TechM", "Ooredoo Team"].reduce((s, v) => s + activeQuarters.reduce((ss, q) => ss + JIRA_VENDOR_UAT[bu][q][v]["In Progress"], 0), 0);
            const grandTotal = grandDel + grandMissed;
            const grandPct   = grandTotal > 0 ? Math.round((grandDel / grandTotal) * 100) : 0;
            return (
              <div style={{ marginTop: 12, paddingTop: 12, borderTop: "1px solid #F3F4F6", display: "grid", gridTemplateColumns: isMobile ? "90px 1fr 52px" : "140px 1fr 140px", gap: isMobile ? 8 : 12, alignItems: "center" }}>
                <div style={{ fontSize: isMobile ? 11 : 12, fontWeight: 700, color: "#111827" }}>All Vendors</div>
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                    <span style={{ fontSize: 10, color: "#16A34A", fontWeight: 700 }}>Delivered {grandPct}% <span style={{ fontSize: 9, opacity: 0.85 }}>({grandDel})</span></span>
                    <span style={{ fontSize: 10, color: "#EAB308", fontWeight: 700 }}>In Progress {100 - grandPct}% <span style={{ fontSize: 9, opacity: 0.85 }}>({grandMissed})</span></span>
                  </div>
                  <div style={{ height: 7, background: "#F3F4F6", borderRadius: 99, overflow: "hidden", position: "relative" }}>
                    <div style={{ position: "absolute", left: 0, top: 0, height: "100%", width: `${grandPct}%`, background: "#16A34A", borderRadius: 99 }} />
                    <div style={{ position: "absolute", left: `${grandPct}%`, top: 0, height: "100%", width: `${100 - grandPct}%`, background: "#EAB308", borderRadius: 99 }} />
                  </div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <span style={{ fontSize: isMobile ? 13 : 14, fontWeight: 800, color: "#111827" }}>{grandTotal}</span>
                  <div style={{ fontSize: 9, color: "#9CA3AF" }}>Total DRFs</div>
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
