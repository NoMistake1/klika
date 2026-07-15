import {
  AlarmClock,
  Baby,
  BedDouble,
  Bike,
  Bus,
  Car,
  Coffee,
  ConciergeBell,
  Croissant,
  Dog,
  Footprints,
  Lock,
  Luggage,
  Map,
  ParkingSquare,
  Phone,
  Plane,
  Printer,
  Scissors,
  Sparkles,
  Sun,
  Ticket,
  Train,
  TreePine,
  Utensils,
  Waves,
  Wifi,
  Wine,
  type LucideIcon,
} from "lucide-react";
import type { IconName } from "@/types";

/**
 * Maps the `IconName` union to lucide components.
 *
 * An explicit map rather than a dynamic lookup: it keeps the union honest (a
 * name with no icon fails type checking), and lets the bundler tree-shake to
 * only the icons actually referenced.
 */
const icons: Record<IconName, LucideIcon> = {
  AlarmClock,
  Baby,
  BedDouble,
  Bike,
  Bus,
  Car,
  Coffee,
  ConciergeBell,
  Croissant,
  Dog,
  Footprints,
  Lock,
  Luggage,
  Map,
  ParkingSquare,
  Phone,
  Plane,
  Printer,
  Scissors,
  Sparkles,
  Sun,
  Ticket,
  Train,
  TreePine,
  Utensils,
  Waves,
  Wifi,
  Wine,
};

/** Renders a named icon. Always decorative — label the surrounding element. */
export function Icon({ name, className }: { name: IconName; className?: string }) {
  const Component = icons[name];
  return <Component aria-hidden="true" focusable="false" className={className} />;
}
