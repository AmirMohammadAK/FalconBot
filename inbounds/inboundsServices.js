import { PrismaClient } from "@prisma/client";
import { hashKey } from "../utils/hashKeyManager.js";
import logger from "../helper/logger.js";
import { decrypt } from "../utils/encryptionManager.js";

const prisma = new PrismaClient();

export const getInbounds = async () => {
  try {
    const inbounds = await prisma.inbound.findMany({
      include: {
        panel: true,
      },
    });

    const formattedInbounds = inbounds.map((inbound) => ({
      id: inbound.id,
      name: inbound.name,
      host: decrypt(inbound.panel.host),
    }));

    logger.info(`Inbounds retrieved: ${JSON.stringify(formattedInbounds)}`);
    return formattedInbounds;
  } catch (error) {
    logger.error(`Failed to retrieve inbounds: ${error.message}`);
    throw new Error("Server Error: Failed to retrieve inbounds");
  }
};

export const addInbound = async (host, id, name) => {
  const panelKey = hashKey(host);
  try {
    const newInbound = await prisma.inbound.create({
      data: {
        id,
        name,
        panelKey,
      },
    });
    logger.info(`Inbound created: ${JSON.stringify(newInbound)}`);
    return newInbound;
  } catch (error) {
    logger.error(`Failed to create inbound: ${error.message}`);
    throw new Error("Server Error: Failed to create inbound");
  }
};

export const updateInbound = async (host, id, name) => {
  const panelKey = hashKey(host);
  try {
    const updatedInbound = await prisma.inbound.update({
      where: { panelKey_id: { panelKey, id } },
      data: {
        name,
      },
    });
    logger.info(`Inbound updated: ${JSON.stringify(updatedInbound)}`);
    return updatedInbound;
  } catch (error) {
    logger.error(`Failed to update inbound: ${error.message}`);
    throw new Error("Server Error: Failed to update inbound");
  }
};

export const deleteInbound = async (host, id) => {
  const panelKey = hashKey(host);
  try {
    await prisma.inbound.delete({
      where: { panelKey_id: { panelKey, id } },
    });
    logger.info(`Inbound deleted for host: ${host} and id: ${id}`);
  } catch (error) {
    logger.error(`Failed to delete inbound: ${error.message}`);
    throw new Error("Server Error: Failed to delete inbound");
  }
};

