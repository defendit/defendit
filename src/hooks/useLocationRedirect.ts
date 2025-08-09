/*
Copyright © 2025 Defend I.T. Solutions LLC. All Rights Reserved.

This software and its source code are the proprietary property of
Defend I.T. Solutions LLC and are protected by United States and
international copyright laws. Unauthorized reproduction, distribution,
modification, display, or use of this software, in whole or in part, without the
prior written permission of Defend I.T. Solutions LLC, is strictly prohibited.

This software is provided for use only by authorized employees, contractors, or
licensees of Defend I.T. Solutions LLC and may not be disclosed to any third
party without express written consent.
*/

"use client";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { useLocation, supportedCities } from "@/providers/location";

export const useLocationRedirect = (shouldRedirect = true) => {
  const router = useRouter();
  const { location } = useLocation();

  useEffect(() => {
    if (typeof window === "undefined" || !shouldRedirect) return;
    // Get the stored location
    if (location && supportedCities[location]) {
      router.replace(supportedCities[location]);
    }
  }, [router, shouldRedirect, location]);
};
