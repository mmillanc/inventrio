"use client";

import CrudDialog from "@/modules/_core/components/CrudDialog";
import type { ReferenceMap } from "@/modules/_core/hooks/useReferences";
import inventoryConfig from "../config";
import type { Item } from "../types";

interface ItemFormProps {
  open: boolean;
  item: Item | null;
  references: ReferenceMap;
  onClose: () => void;
  onSubmit: (values: Record<string, unknown>) => Promise<void>;
}

export function ItemForm({ open, item, references, onClose, onSubmit }: ItemFormProps) {
  return (
    <CrudDialog
      open={open}
      title={item ? `Editar ${item.name}` : "Nuevo artículo"}
      fields={inventoryConfig.fields}
      initialValues={item}
      references={references}
      onClose={onClose}
      onSubmit={onSubmit}
    />
  );
}

export default ItemForm;
