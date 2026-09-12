# Study 49: the 47.8 tuning and tow-swing verification

Play tow-refinement.html. Builds 47 and 48 remain unchanged for comparison.

All parameters changed between 47 and 48 now sit exactly 80% from 47 toward 48: response/turn multipliers Luxury .984/.992, Pintail 1.016/1.012, Cruiser 1.064/1.020, Element 1.112/1.008; carve-loss retention .064 and rope damping .684. No new whip force, speed bonus, or replacement steering solver. Existing 1.3 rad/s yaw limit, grip, curb/grate crashes, ollies and modular performance build are preserved.

Research: reviewed the demonstration footage and coaching description of David OC's [Progressive Edge](https://www.youtube.com/watch?v=qAloNLYBGOM), and aerial slalom footage in the Waterski Broadcasting Company's [Tournament Water Ski Slalom](https://www.youtube.com/watch?v=g_SZ1OmtA1g). David's demonstration emphasizes waiting for line tension and progressively loading the edge. [Virtual Water Ski Coach](https://virtualwaterskicoach.com/2018/anatomy-of-a-slalom-water-ski-tournament/) explains how a skier's cross-course speed can exceed boat speed. These references inform the tow behavior, not a claim that wheel traction behaves identically to a ski edge.

The existing unilateral spring already permits rope-driven acceleration, tangential motion, and zero pull with slack. There is no alongside-position crash or cap at car speed. It still crashes on actual car overlap, curbs, hazards or accumulated instability.

Validation: exact interpolation assertions; eight isolated flat-road maneuvers covering every board at minimum/maximum rope length all load the line, exceed the 6 m/s car speed, create slack and remain riding. Four alongside slack tests confirm zero tension. These are controlled physics checks, not all-road safety guarantees.

Real rendered environment check: start station 440, 2.44 m rope, BLACK, car 6 m/s, progressive outward steer then easing, crouched, seven seconds. All 16 covers, 9 drains and 39 solids active. Cruiser peak 9.296 m/s, rider reaches .734 m behind car center (alongside), stays riding and develops slack. Street peak 8.714 m/s, 1.083 m behind car center, also remains riding and develops slack. Local tow-study.html reproduces the check and displays the closest alongside position. No browser errors.

15 board/curb checks and 14 detailed hazard checks pass. Full physics/gesture/lap suite is recorded locally. Phone handling remains for user playtesting.
