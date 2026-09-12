# Surface contact pass 37

Preview: http://127.0.0.1:4197/environment-study.html?v=37c

Surface sampling now uses the actual rendered, graded terrain triangles plus the road, curb and shoulder meshes. This removes dependence on the original terrain formula for prop placement.

All eight cabinets use footprint-sampled concrete foundations. Pad tops clear the highest sampled ground by 85 mm; cabinet bottoms are seated 2 mm above the pad surface. Pad depth reaches below the lowest ground sample.

All 16 manhole covers have their upper geometry checked against pavement and adjusted for a minimum 18 mm exposed lip. All nine grates have rigid road/gutter slope alignment, a thinner frame, and 25 support checks targeting a 20 mm exposed upper lip. These are geometric presentation checks, not newly enabled crash collisions.

Three irregular piles remain. Their bases now follow the visible terrain, and a dedicated Dirt pile close-up view is available. Cul-de-sac overview is wider and higher.

Browser checked cabinet pad seating, grate exposure and pile visibility. Contact audit values are available in the inspection page DOM for verification. Standalone ride and inspection bundles built successfully. Public game unchanged.
