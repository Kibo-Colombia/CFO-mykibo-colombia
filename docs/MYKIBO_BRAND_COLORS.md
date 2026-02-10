# Mykibo Brand Color Palette

**Engineering Hope. Building Legacy.**

This document defines the canonical color palette for all Mykibo applications. Each app has a primary color that defines its brand identity while maintaining visual harmony across the ecosystem.

---

## 🎨 Mykibo App Color System

### **1. Mykibo Nexus**

*Digital Campus Hub*

**Primary Color: GREEN**

```css
/* Main Palette */
--nexus-primary: #A9D9C7;        /* Mint Green - Main brand color */
--nexus-dark: #1E4332;           /* Dark Green - Backgrounds */
--nexus-mid: #477365;            /* Forest Green - Mid tones */
--nexus-accent: #A9D9C7;         /* Accent (same as primary) */

/* Usage Priority */
1. Primary actions, buttons, links: #A9D9C7
2. Backgrounds (cards, sections): #1E4332
3. Hover states: #477365
4. Text/Icons: #F2F2F2 (White) or #A9D9C7 (Green)
```

**Color Mapping:**

- Navigation: Green
- Cards: Dark Green (#1E4332) with Green borders (#A9D9C7)
- Buttons: Transparent → Green fill on hover
- Connected Apps indicator: Green background when "You are here"

---

### **2. Mykibo CFO**

*Finance & Budgeting*

**Primary Color: BLUE**

```css
/* Main Palette */
--cfo-primary: #65A1C9;          /* Blue - Main brand color */
--cfo-dark: #142430;             /* Darker Blue - Backgrounds */
--cfo-mid: #1A3040;              /* Mid Blue - Cards/Sections */
--cfo-accent: #3E6D8D;           /* Lighter Blue - Accents */

/* Usage Priority */
1. Primary actions, buttons, links: #65A1C9
2. Backgrounds (main): #142430
3. Backgrounds (cards): #1A3040
4. Text/Icons: #F2F2F2 (White) or #65A1C9 (Blue)
```

**Color Mapping:**

- Navigation: Blue
- Cards: Dark Blue (#1A3040) with Blue borders (#65A1C9)
- Buttons: Transparent → Blue fill on hover
- Filter panels: Blue theme (#142430 backgrounds)
- Loading spinners: Blue
- Connected Apps indicator: Blue background when "You are here"

**Budget Target Colors:**

- 💰 **Income/Total**: Blue (#65A1C9)
- 🏠 **Living**: Green (#A9D9C7)
- 🎨 **Present**: Red (#C24656)
- 🚀 **Future**: Purple (#614FBB)

---

### **3. Mykibo Studio**

*Content Creation & Design*

**Primary Color: MINT/CYAN**

```css
/* Main Palette */
--studio-primary: #7DD3C0;       /* Mint Cyan - Creative energy */
--studio-dark: #1A3B35;          /* Dark Teal - Backgrounds */
--studio-mid: #2D5A52;           /* Mid Teal - Cards */
--studio-accent: #A8E6D8;        /* Light Mint - Highlights */

/* Usage Priority */
1. Primary actions: #7DD3C0
2. Backgrounds (main): #1A3B35
3. Cards: #2D5A52
4. Accents/Highlights: #A8E6D8
```

**Color Mapping:**

- Navigation: Mint Cyan
- Cards: Dark Teal with Mint borders
- Creative tools: Mint accents
- Connected Apps indicator: Mint background when "You are here"

---

### **4. Mykibo Lab**

*Research & Innovation (Purple/Violet)*

**Primary Color: PURPLE**

```css
/* Main Palette */
--lab-primary: #614FBB;          /* Purple - Innovation */
--lab-dark: #231B45;             /* Dark Purple - Backgrounds */
--lab-mid: #463988;              /* Mid Purple - Cards */
--lab-accent: #8B7BC7;           /* Light Purple - Highlights */

/* Usage Priority */
1. Primary actions: #614FBB
2. Backgrounds (main): #231B45
3. Cards: #463988
4. Accents: #8B7BC7
```

**Color Mapping:**

- Navigation: Purple
- Cards: Dark Purple with Purple borders
- Research tools: Purple accents
- Connected Apps indicator: Purple background when "You are here"

---

### **5. Mykibo Dojo**

*Skills & Training*

**Primary Color: RED/CRIMSON**

```css
/* Main Palette */
--dojo-primary: #C24656;         /* Red - Energy & Action */
--dojo-dark: #421C22;            /* Dark Red - Backgrounds */
--dojo-mid: #8C333F;             /* Mid Red - Cards */
--dojo-accent: #D97283;          /* Light Red - Highlights */

/* Usage Priority */
1. Primary actions: #C24656
2. Backgrounds (main): #421C22
3. Cards: #8C333F
4. Accents: #D97283
```

**Color Mapping:**

- Navigation: Red
- Cards: Dark Red with Red borders
- Training modules: Red accents
- Achievement badges: Red highlights
- Connected Apps indicator: Red background when "You are here"

---

## 🎯 Universal Design Rules

### **Border Standards**

- ✅ **Default border**: `border` (1px) - NOT `border-2`
- ✅ All cards, buttons, and containers use 1px borders
- ❌ **Never use** thicker borders unless specifically needed for emphasis

### **Connected Apps Component Rules**

Each app card should:

1. **Default state**: Transparent background, colored border (app's primary color)
2. **Hover state**: App's dark background color appears smoothly
3. **"You are here" badge**: Uses app's primary color as background
4. **Transition**: `transition-all duration-300` for smooth effects

Example:

```tsx
// CFO App Card
<div 
  className="border rounded-2xl transition-all duration-300"
  style={{ 
    backgroundColor: 'transparent', 
    borderColor: '#65A1C9' // CFO Blue
  }}
  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#1A3040'}
  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
>
```

### **Color Priority Hierarchy**

All apps follow this hierarchy:

1. **Primary Color** - Main brand identity
   - Navigation elements
   - Primary CTAs
   - App indicators
   - Borders

2. **Dark Variant** - Main backgrounds
   - Page backgrounds
   - Modal backgrounds

3. **Mid Variant** - Secondary surfaces
   - Cards
   - Sections
   - Hover states

4. **Foreground** - Always #F2F2F2 (White)
   - Body text
   - Headings
   - Icons (when not colored)

---

## 📋 Implementation Checklist

When implementing color for any Mykibo app:

- [ ] Use semantic CSS variables from `globals.css`
- [ ] Follow the app's color priority hierarchy
- [ ] Use 1px borders (`border`, not `border-2`)
- [ ] Implement transparent → colored hover effects
- [ ] Ensure text contrast meets accessibility standards
- [ ] Test dark mode consistency
- [ ] Verify Connected Apps component styling

---

## 🔗 Cross-App Consistency

When displaying multiple apps together (e.g., Connected Apps section):

- Each app maintains its own color identity
- Border colors immediately identify the app
- Hover effects reinforce the app's brand
- "You are here" badges use the current app's color
- External links show their destination app's color

**Example: In CFO App**

- CFO card: Blue border, blue text, blue badge
- Nexus card: Green border, green text, green "Launch" badge
- Studio card: Mint border, mint text, mint "Launch" badge

This creates a cohesive yet distinctive visual language across the Mykibo ecosystem.
