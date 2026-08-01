import type { ModuleDefinition } from "@/modules/_core/types";
import giftcardsConfig from "./config";
import GiftcardList from "./components/GiftcardList";

export const giftcardsModule: ModuleDefinition = {
  config: giftcardsConfig,
  View: GiftcardList,
};

export { giftcardsConfig };
export { default as GiftcardList } from "./components/GiftcardList";
export { useGiftcards } from "./hooks/useGiftcards";
export type { Giftcard } from "./types";

export default giftcardsModule;
