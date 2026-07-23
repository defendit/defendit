/*
Copyright © 2026 Defend I.T. Solutions LLC. All Rights Reserved.

This software and its source code are the proprietary property of
Defend I.T. Solutions LLC and are protected by United States and
international copyright laws. Unauthorized reproduction, distribution,
modification, display, or use of this software, in whole or in part, without the
prior written permission of Defend I.T. Solutions LLC, is strictly prohibited.

This software is provided for use only by authorized employees, contractors, or
licensees of Defend I.T. Solutions LLC and may not be disclosed to any third
party without express written consent.
*/

import type { DeviceId } from "../engine/devices";
import type { AppliedCombo } from "../engine/scoring";
import type { ZoneId } from "../engine/zones";

/**
 * One-liner narrative per (device, zone). Tone follows digital_house_v_1_spec
 * §16: calm, plain-English, consequences over judgments. Used by the analysis
 * toast that appears below the house after each placement.
 */
export const DEVICE_TIPS: Record<DeviceId, Record<ZoneId, string>> = {
  "work-laptop": {
    main: "Good fit. Keep work devices with the devices you trust most.",
    guest: "Guest networks can block access to printers and other local devices.",
    iot: "This puts work data on the same network as less trusted smart devices.",
  },
  "personal-phone": {
    main: "Good fit. Keep it with the devices you trust most.",
    guest: "Guest networks can limit access to printers and other local devices.",
    iot: "This puts personal data near smart devices that may receive fewer updates.",
  },
  tablet: {
    main: "Good fit. Keep it with your other personal devices.",
    guest: "Fine for internet access, but local devices may be unavailable.",
    iot: "This puts a personal device on the smart-device network.",
  },
  "guest-phone": {
    main: "This gives a visitor's device the same network access as your personal devices.",
    guest: "Good fit. A separate Guest network limits access to personal devices.",
    iot: "This separates it from Main, but visitor devices belong on the Guest network.",
  },
  printer: {
    main: "Convenient, but printers may receive security updates less often than personal devices.",
    guest: "This limits access, but your devices may not be able to print.",
    iot: "Good fit. The IoT network limits its access to personal devices.",
  },
  "smart-tv": {
    main: "This gives a connected TV more access to personal devices than it needs.",
    guest: "This limits access, but the Guest network is intended for visitors.",
    iot: "Good fit. The IoT network limits its access to personal devices.",
  },
  "smart-speaker": {
    main: "This gives a voice assistant more access to personal devices than it needs.",
    guest: "This limits access, but the Guest network is intended for visitors.",
    iot: "Good fit. The IoT network limits its access to personal devices.",
  },
  "game-console": {
    main: "This gives a game console more access to personal devices than it needs.",
    guest: "This limits access, but the Guest network is intended for visitors.",
    iot: "Good fit. The IoT network limits its access to personal devices.",
  },
  "doorbell-camera": {
    main: "This gives an internet-connected camera access to personal devices.",
    guest: "This limits access, but cameras belong with other smart devices.",
    iot: "Good fit. Separation limits its access to personal devices.",
  },
  "camera-hub": {
    main: "A compromised camera could provide a path to personal or work devices.",
    guest: "This limits access, but cameras belong with other smart devices.",
    iot: "Good fit. Separation can limit the effect of a camera compromise.",
  },
};

/**
 * Short combo-penalty messages keyed by AppliedCombo.id. These appear in the
 * "Pressure building" warning panel and in the end-state summary.
 */
export const COMBO_TIPS: Record<AppliedCombo["id"], string> = {
  "guest-mixed-with-trusted":
    "A visitor's device is sharing a network with your personal devices.",
  "camera-on-main":
    "A camera shares the Main network with personal devices.",
  "entertainment-clutter":
    "Smart devices share the Main network with personal devices.",
  "single-zone-dump":
    "All devices share one network, so one compromised device could put others at risk.",
};
