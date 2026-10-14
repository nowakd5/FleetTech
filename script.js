
"use strict";

// ==========================================
// FleetTech - Demo truck and IT asset records
// All names and records below are fictional.
// ==========================================

const STORAGE_KEY = "fleettech-equipment-v1";

const trucks = [
    {
        id: "TR-1042",
        employee: "Mike Johnson",
        status: "Active"
    },
    {
        id: "TR-1043",
        employee: "Sarah Miller",
        status: "Active"
    },
    {
        id: "TR-1044",
        employee: "Alex Carter",
        status: "Inactive"
    },
    {
        id: "TR-1045",
        employee: "Jordan Lee",
        status: "Active"
    },
    {
        id: "TR-1046",
        employee: "Taylor Brooks",
        status: "Active"
    }
];

const starterEquipment = [
    {
        id: "AST-2001",
        name: "Company Tablet",
        type: "Tablet",
        truckId: "TR-1042",
        status: "Active"
    },
    {
        id: "AST-2002",
        name: "Mobile Hotspot",
        type: "Hotspot",
        truckId: "TR-1042",
        status: "Issue"
    },
    {
        id: "AST-2003",
        name: "GPS Unit",
        type: "GPS",
        truckId: "TR-1043",
        status: "Active"
    },
    {
        id: "AST-2004",
        name: "Company Radio",
        type: "Radio",
        truckId: "TR-1043",
        status: "Maintenance"
    },
    {
        id: "AST-2005",
        name: "Company Tablet",
        type: "Tablet",
        truckId: "TR-1044",
        status: "Active"
    },
    {
        id: "AST-2006",
        name: "GPS Unit",
        type: "GPS",
        truckId: "TR-1045",
        status: "Active"
    },
    {
        id: "AST-2007",
        name: "Mobile Hotspot",
        type: "Hotspot",
        truckId: "TR-1045",
        status: "Active"
    },
    {
        id: "AST-2008",
        name: "Company Radio",
        type: "Radio",
        truckId: "TR-1046",
        status: "Issue"
    }
];

// Load saved equipment records, or start with the demo records.
function loadEquipment() {
    try {
        const savedData = localStorage.getItem(STORAGE_KEY);

        if (savedData) {
            const parsedData = JSON.parse(savedData);

            if (Array.isArray(parsedData)) {
                return parsedData;
            }
        }
    } catch (error) {
        console.warn("Saved demo data could not be loaded.", error);
    }

    return starterEquipment.map(item => ({ ...item }));
}

let equipment = loadEquipment();

// Save equipment changes in this browser.
function saveEquipment() {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(equipment));
    } catch (error) {
        console.warn("Equipment changes could not be saved.", error);
        alert("Your browser could not save this change. Check your browser storage settings.");
    }
}

// ==========================================
// Dashboard totals and equipment summary
// ==========================================

function updateDashboard() {
    const totalTrucks = document.getElementById("total-trucks");
    const totalDevices = document.getElementById("total-devices");
    const attentionCount = document.getElementById("attention-count");
    const attentionList = document.getElementById("attention-list");

    if (totalTrucks) {
        totalTrucks.textContent = trucks.length;
    }

    if (totalDevices) {
        totalDevices.textContent = equipment.length;
    }

    const attentionItems = equipment.filter(item =>
        item.status === "Issue" || item.status === "Maintenance"
    );

    if (attentionCount) {
        attentionCount.textContent = attentionItems.length;
    }

    if (attentionList) {
        if (attentionItems.length === 0) {
            attentionList.textContent = "Everything looks good. No equipment needs attention.";
        } else {
            attentionList.textContent = attentionItems
                .map(item => `${item.name} (${item.id}) — ${item.status}`)
                .join(" | ");
        }
    }

    renderDashboardEquipment();
}

// ==========================================
// Truck inventory table, search, and filter
// ==========================================

function renderTrucks() {
    const table = document.getElementById("truck-table");

    if (!table) return;

    const searchInput = document.getElementById("truck-search");
    const statusFilter = document.getElementById("truck-status-filter");

    const searchTerm = searchInput
        ? searchInput.value.trim().toLowerCase()
        : "";

    const selectedStatus = statusFilter
        ? statusFilter.value
        : "All";

    const filteredTrucks = trucks.filter(truck => {
        const matchesSearch =
            truck.id.toLowerCase().includes(searchTerm) ||
            truck.employee.toLowerCase().includes(searchTerm);

        const matchesStatus =
            selectedStatus === "All" ||
            selectedStatus === "" ||
            truck.status === selectedStatus;

        return matchesSearch && matchesStatus;
    });

    if (filteredTrucks.length === 0) {
        table.innerHTML = `
            <tr>
                <td colspan="5" class="empty-state">
                    No trucks match your search.
                </td>
            </tr>
        `;
        return;
    }

    table.innerHTML = filteredTrucks.map(truck => {
        const deviceCount = equipment.filter(
            item => item.truckId === truck.id
        ).length;

        return `
            <tr>
                <td>${truck.id}</td>
                <td>${truck.employee}</td>
                <td>
                    <span class="status ${statusClass(truck.status)}">
                        ${truck.status}
                    </span>
                </td>
                <td>${deviceCount}</td>
                <td>Company vehicle</td>
            </tr>
        `;
    }).join("");
}

// ==========================================
// Equipment inventory table, search, and filter
// ==========================================

function renderEquipment() {
    const table = document.getElementById("equipment-table");

    if (!table) return;

    const searchInput = document.getElementById("equipment-search");
    const statusFilter = document.getElementById("equipment-status-filter");

    const searchTerm = searchInput
        ? searchInput.value.trim().toLowerCase()
        : "";

    const selectedStatus = statusFilter
        ? statusFilter.value
        : "All";

    const filteredEquipment = equipment.filter(item => {
        const truck = trucks.find(t => t.id === item.truckId);
        const employee = truck ? truck.employee : "";

        const searchableText = [
            item.id,
            item.name,
            item.type,
            item.truckId,
            employee
        ].join(" ").toLowerCase();

        const matchesSearch = searchableText.includes(searchTerm);

        const matchesStatus =
            selectedStatus === "All" ||
            selectedStatus === "" ||
            item.status === selectedStatus;

        return matchesSearch && matchesStatus;
    });

    if (filteredEquipment.length === 0) {
        table.innerHTML = `
            <tr>
                <td colspan="6" class="empty-state">
                    No equipment matches your search.
                </td>
            </tr>
        `;
        return;
    }

    table.innerHTML = filteredEquipment.map(item => {
        const truck = trucks.find(t => t.id === item.truckId);
        const employee = truck ? truck.employee : "Unassigned";

        return `
            <tr>
                <td>${item.id}</td>
                <td>${item.name}</td>
                <td>${item.type}</td>
                <td>${item.truckId}</td>
                <td>
                    <span class="status ${statusClass(item.status)}">
                        ${item.status}
                    </span>
                </td>
                <td>
                    <select class="status-select"
                            data-equipment-id="${item.id}"
                            aria-label="Change status for ${item.id}">
                        <option value="Active" ${item.status === "Active" ? "selected" : ""}>Active</option>
                        <option value="Maintenance" ${item.status === "Maintenance" ? "selected" : ""}>Maintenance</option>
                        <option value="Issue" ${item.status === "Issue" ? "selected" : ""}>Issue</option>
                    </select>
                    <div class="employee-note">${employee}</div>
                </td>
            </tr>
        `;
    }).join("");
}

// ==========================================
// Recent equipment table on the dashboard
// ==========================================

function renderDashboardEquipment() {
    const table = document.getElementById("dashboard-equipment");

    if (!table) return;

    const recentItems = equipment.slice(0, 5);

    if (recentItems.length === 0) {
        table.innerHTML = `
            <tr>
                <td colspan="4" class="empty-state">
                    No equipment records are available.
                </td>
            </tr>
        `;
        return;
    }

    table.innerHTML = recentItems.map(item => `
        <tr>
            <td>${item.id}</td>
            <td>${item.name}</td>
            <td>${item.truckId}</td>
            <td>
                <span class="status ${statusClass(item.status)}">
                    ${item.status}
                </span>
            </td>
        </tr>
    `).join("");
}

// Match a status to its CSS color.
function statusClass(status) {
    const classes = {
        Active: "status-active",
        Maintenance: "status-maintenance",
        Issue: "status-issue",
        Inactive: "status-inactive"
    };

    return classes[status] || "";
}

// ==========================================
// Navigation between dashboard sections
// ==========================================

function showView(viewName) {
    const viewIds = {
        dashboard: ["dashboard-view", "dashboard"],
        trucks: ["trucks-view", "trucks"],
        equipment: ["equipment-view", "equipment"]
    };

    const possibleIds = Object.values(viewIds).flat();

    possibleIds.forEach(id => {
        const section = document.getElementById(id);

        if (section) {
            section.classList.add("hidden");
        }
    });

    const idsToShow = viewIds[viewName] || viewIds.dashboard;

    idsToShow.forEach(id => {
        const section = document.getElementById(id);

        if (section) {
            section.classList.remove("hidden");
        }
    });

    document.querySelectorAll("[data-view]").forEach(button => {
        button.classList.toggle(
            "active",
            button.dataset.view === viewName
        );
    });

    const pageTitle = document.getElementById("page-title");

    if (pageTitle) {
        const titles = {
            dashboard: "Dashboard Overview",
            trucks: "Truck Inventory",
            equipment: "Equipment Inventory"
        };

        pageTitle.textContent = titles[viewName] || titles.dashboard;
    }
}

// ==========================================
// Connect the controls to the functions
// ==========================================

document.addEventListener("DOMContentLoaded", () => {
    // Navigation buttons
    document.querySelectorAll("[data-view]").forEach(button => {
        button.addEventListener("click", () => {
            showView(button.dataset.view);
        });
    });

    // Search and filter controls
    const truckSearch = document.getElementById("truck-search");
    const truckFilter = document.getElementById("truck-status-filter");
    const equipmentSearch = document.getElementById("equipment-search");
    const equipmentFilter = document.getElementById("equipment-status-filter");

    if (truckSearch) {
        truckSearch.addEventListener("input", renderTrucks);
    }

    if (truckFilter) {
        truckFilter.addEventListener("change", renderTrucks);
    }

    if (equipmentSearch) {
        equipmentSearch.addEventListener("input", renderEquipment);
    }

    if (equipmentFilter) {
        equipmentFilter.addEventListener("change", renderEquipment);
    }

    // Save equipment status changes.
    document.addEventListener("change", event => {
        const dropdown = event.target.closest("[data-equipment-id]");

        if (!dropdown) return;

        const item = equipment.find(
            entry => entry.id === dropdown.dataset.equipmentId
        );

        if (!item) return;

        item.status = dropdown.value;

        saveEquipment();
        renderEquipment();
        updateDashboard();
    });

    // Draw the initial screen.
    updateDashboard();
    renderTrucks();
    renderEquipment();
    showView("dashboard");
});
