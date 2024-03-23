"use server";
import { ComputeManagementClient, VirtualMachine } from "@azure/arm-compute";
import { NetworkManagementClient } from "@azure/arm-network";
import { ResourceManagementClient } from "@azure/arm-resources";
import { StorageManagementClient } from "@azure/arm-storage";
import { ClientSecretCredential } from "@azure/identity";
import * as util from "util";
import { deleteCookie } from "./connection";

// Store function output to be used elsewhere
let randomIds: { [key: string]: string } = {};

//Random number generator for service names and settings
let resourceGroupName = _generateRandomId("diberry-testrg", randomIds);
let vmName = _generateRandomId("testvm", randomIds);
let storageAccountName = _generateRandomId("testac", randomIds);
let vnetName = _generateRandomId("testvnet", randomIds);
let subnetName = _generateRandomId("testsubnet", randomIds);
let publicIPName = _generateRandomId("testpip", randomIds);
let networkInterfaceName = _generateRandomId("testnic", randomIds);
let ipConfigName = _generateRandomId("testcrpip", randomIds);
let domainNameLabel = _generateRandomId("testdomainname", randomIds);
let osDiskName = _generateRandomId("testosdisk", randomIds);

// Resource configs
const location = "eastus";
const accType = "Standard_LRS";

// Ubuntu config for VM
const adminUsername = "notadmin";
const adminPassword = "Pa$$w0rd92";

// Azure platform authentication
const tenantId = process.env.AZURE_TENANT_ID;
const clientId = process.env.AZURE_CLIENT_ID;
const secret = process.env.AZURE_CLIENT_SECRET;
const subscriptionId = process.env.AZURE_SUBSCRIPTION_ID;

if (!tenantId || !clientId || !secret || !subscriptionId) {
  throw new Error(
    "Default credentials couldn't be found. The tenantId, clientId, secret and subscriptionId are required."
  );
}

const credentials = new ClientSecretCredential(tenantId, clientId, secret);

// Azure services
const resourceClient = new ResourceManagementClient(
  credentials,
  subscriptionId
);
const computeClient = new ComputeManagementClient(credentials, subscriptionId);
const storageClient = new StorageManagementClient(credentials, subscriptionId);
const networkClient = new NetworkManagementClient(credentials, subscriptionId);

export const main = async (publisher: string, offer: string, sku: string) => {
  if (!publisher || !offer || !sku) {
    throw new Error(
      "Invalid arguments or missing arguments. Please try again."
    );
  }

  resourceGroupName = _generateRandomId("diberry-testrg", randomIds);
  vmName = _generateRandomId("testvm", randomIds);
  storageAccountName = _generateRandomId("testac", randomIds);
  vnetName = _generateRandomId("testvnet", randomIds);
  subnetName = _generateRandomId("testsubnet", randomIds);
  publicIPName = _generateRandomId("testpip", randomIds);
  networkInterfaceName = _generateRandomId("testnic", randomIds);
  ipConfigName = _generateRandomId("testcrpip", randomIds);
  domainNameLabel = _generateRandomId("testdomainname", randomIds);
  osDiskName = _generateRandomId("testosdisk", randomIds);

  try {
    const result = await createResources(publisher, offer, sku);

    return result;
  } catch (error) {
    console.log(error);
    await startDelete();
    await deleteCookie("vmAddressToken");
    return null;
  }
};

const deleteGroup = async () => {
  console.log(
    `Deleting the ressource group: ${resourceGroupName} ! Please wait...`
  );
  return await resourceClient.resourceGroups.beginDeleteAndWait(
    resourceGroupName
  );
};

export const startDelete = async () => {
  await deleteGroup();
  console.log("Resources deleted successfully : " + resourceGroupName);
};

const createResources = async (
  publisher: string,
  offer: string,
  sku: string
) => {
  try {
    await createResourceGroup();
    await createStorageAccount();
    await createVnet();

    const subnetInfo = await getSubnetInfo();
    const publicIPInfo = await createPublicIP();
    const nicInfo = await createNIC(subnetInfo, publicIPInfo);

    const vmImageInfo = await findVMImage(publisher, offer, sku);

    if (nicInfo.id === undefined) {
      throw new Error("Erreur dans la création de l'interface réseau.");
    }

    await createVirtualMachine(
      nicInfo.id,
      vmImageInfo[0].name,
      publisher,
      offer,
      sku
    );

    if (!publicIPInfo.dnsSettings) {
      throw new Error(
        "Erreur dans la création de la machine virtuelle et de son groupe de ressource, veuillez réessayer."
      );
    }

    return publicIPInfo.dnsSettings.fqdn;
  } catch (err) {
    console.log(err);
  }
};

const createResourceGroup = async () => {
  const groupParameters = {
    location: location,
    tags: { sampletag: "sampleValue" },
  };
  console.log("\n1.Creating resource group: " + resourceGroupName);
  return await resourceClient.resourceGroups.createOrUpdate(
    resourceGroupName,
    groupParameters
  );
};

const createStorageAccount = async () => {
  console.log("\n2.Creating storage account: " + storageAccountName);
  const createParameters = {
    location: location,
    sku: {
      name: accType,
    },
    kind: "Storage",
    tags: {
      tag1: "val1",
      tag2: "val2",
    },
  };
  return await storageClient.storageAccounts.beginCreateAndWait(
    resourceGroupName,
    storageAccountName,
    createParameters
  );
};

const createVnet = async () => {
  const vnetParameters = {
    location: location,
    addressSpace: {
      addressPrefixes: ["10.0.0.0/16"],
    },
    dhcpOptions: {
      dnsServers: ["10.1.1.1", "10.1.2.4"],
    },
    subnets: [{ name: subnetName, addressPrefix: "10.0.0.0/24" }],
  };
  console.log("\n3.Creating vnet: " + vnetName);
  return await networkClient.virtualNetworks.beginCreateOrUpdateAndWait(
    resourceGroupName,
    vnetName,
    vnetParameters
  );
};

const getSubnetInfo = async () => {
  console.log("\nGetting subnet info for: " + subnetName);
  return await networkClient.subnets.get(
    resourceGroupName,
    vnetName,
    subnetName
  );
};

const createPublicIP = async () => {
  const publicIPParameters = {
    location: location,
    publicIPAllocationMethod: "Dynamic",
    dnsSettings: {
      domainNameLabel: domainNameLabel,
    },
  };
  console.log("\n4.Creating public IP: " + publicIPName);
  return await networkClient.publicIPAddresses.beginCreateOrUpdateAndWait(
    resourceGroupName,
    publicIPName,
    publicIPParameters
  );
};

const createNIC = async (subnetInfo: any, publicIPInfo: any) => {
  const nicParameters = {
    location: location,
    ipConfigurations: [
      {
        name: ipConfigName,
        privateIPAllocationMethod: "Dynamic",
        subnet: subnetInfo,
        publicIPAddress: publicIPInfo,
      },
    ],
  };
  console.log("\n5.Creating Network Interface: " + networkInterfaceName);
  return await networkClient.networkInterfaces.beginCreateOrUpdateAndWait(
    resourceGroupName,
    networkInterfaceName,
    nicParameters
  );
};

const findVMImage = async (publisher: string, offer: string, sku: string) => {
  console.log(
    util.format(
      "\nFinding a VM Image for location %s from " +
        "publisher %s with offer %s and sku %s",
      location,
      publisher,
      offer,
      sku
    )
  );
  return await computeClient.virtualMachineImages.list(
    location,
    publisher,
    offer,
    sku,
    { top: 1 }
  );
};

const createVirtualMachine = async (
  nicId: string,
  vmImageVersionNumber: string,
  publisher: string,
  offer: string,
  sku: string
) => {
  const vmParameters: VirtualMachine = {
    location: location,
    osProfile: {
      computerName: vmName,
      adminUsername: adminUsername,
      adminPassword: adminPassword,
    },
    hardwareProfile: {
      vmSize: "Standard_B1ls",
    },
    storageProfile: {
      imageReference: {
        publisher: publisher,
        offer: offer,
        sku: sku,
        version: vmImageVersionNumber,
      },
      osDisk: {
        name: osDiskName,
        createOption: "fromImage",
        managedDisk: {
          storageAccountType: "Standard_LRS",
        },
      },
    },
    networkProfile: {
      networkInterfaces: [
        {
          id: nicId,
          primary: true,
        },
      ],
    },
  };
  console.log("6.Creating Virtual Machine: " + vmName);
  console.log(
    " VM create parameters: " + util.inspect(vmParameters, { depth: null })
  );
  await computeClient.virtualMachines.beginCreateOrUpdateAndWait(
    resourceGroupName,
    vmName,
    vmParameters
  );
};

function _generateRandomId(
  prefix: string,
  existIds: { [key: string]: string }
): string {
  var newNumber;
  while (true) {
    newNumber = prefix + Math.floor(Math.random() * 10000);
    if (!existIds || !(newNumber in existIds)) {
      break;
    }
  }
  return newNumber;
}
