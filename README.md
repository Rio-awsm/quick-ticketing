# 🎫 Quick Ticketing

A modern and intuitive frontend application built with Next.js for streamlined ticket management.

<p align="center">
  <img src="https://raw.githubusercontent.com/Rio-awsm/quick-ticketing/main/public/quick-ticketing-logo.png" alt="Quick Ticketing Logo" width="400">
</p>

[![Build Status](https://img.shields.io/github/actions/workflow/status/Rio-awsm/quick-ticketing/deploy.yml?branch=main&label=Build)](https://github.com/Rio-awsm/quick-ticketing/actions/workflows/deploy.yml)
[![Release](https://img.shields.io/github/v/release/Rio-awsm/quick-ticketing)](https://github.com/Rio-awsm/quick-ticketing/releases)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/Language-TypeScript-blue)](https://www.typescriptlang.org/)
[![Dependencies Status](https://img.shields.io/librariesio/release/npm/@radix-ui/react-alert-dialog)](https://libraries.io/npm/@radix-ui/react-alert-dialog)

## ✨ Key Features

-   **Intuitive UI:** User-friendly interface for easy ticket creation and management.
-   **Radix UI Components:** Utilizes Radix UI for accessible and reusable components.
-   **Responsive Design:** Optimized for various screen sizes and devices.
-   **Tailwind CSS:** Styled with Tailwind CSS for rapid development and customization.
-   **Alert Dialogs:** Interactive alert dialogs using 

`@radix-ui/react-alert-dialog` for critical user actions.
-   **Select Component:** Enhanced select component with `@radix-ui/react-select` for efficient data selection.

| Ticket List | Ticket Details |  | -------------------------------------------- | -------------------------------------------- |
| --- | --- | --- |
| ![Ticket List](public/screenshot_list.png) | ![Ticket Details](public/screenshot_details.png) |


## 💻 Technologies & Dependencies

This project is built using the following technologies and depends on these libraries:

| Category        | Technology/Library                          | Version | Description |  | --------------- | ----------------------------------------- | ------- | ------------------------------------------------------------------- |
| --- | --- | --- |
| UI Framework    | [Next.js](https://nextjs.org/)           | - | React framework for building web applications |  | UI Components   | @radix-ui/react-alert-dialog             | - | Accessible React alert dialog component |  | UI Components   | @radix-ui/react-label                    | - | Accessible React label component |  | UI Components   | @radix-ui/react-select                   | - | Accessible React select component |  | UI Components   | @radix-ui/react-slot                     | - | Provides a slot element that allows components to be composed together |  | Styling         | Tailwind CSS | - | Utility-first CSS framework |
| --- | --- | --- |
| CSS Utilities | class-variance-authority | - | Utility for creating type-safe and composable class name variations |  | CSS Utilities | clsx |  -      | Utility for constructing `className` strings conditionally.           |  | Icons | lucide-react |  -      | Beautifully simple, pixel-perfect icons                             |  | Database | MongoDB |  -      | Database for storing ticketing data |  | Animations | tw-animate-css                           | - | Add animations with Tailwind CSS |  | TypeScript      | typescript | - | Programming language |
| --- | --- | --- |
| Other           | @tailwindcss/postcss                     | - | PostCSS plugin for Tailwind CSS |  | Types           | @types/node                             | -       | TypeScript definitions for Node.js                                 |
| Types           | @types/react                            | - | TypeScript definitions for React |  | Types           | @types/react-dom                        | - | TypeScript definitions for React DOM |  | CSS Utilities   | tailwind-merge | - | Utility for efficiently merging Tailwind CSS classes |
| --- | --- | --- |
| Core | react | - | JavaScript library for building user interfaces                      |  | Core | react-dom |  -      | Entry point to the DOM and server rendering APIs for React           |
| --- | --- | --- |

## ⚙️ Prerequisites

Before you begin, ensure you have the following installed:

-   [Node.js](https://nodejs.org/) (version 18 or later)
-   [npm](https://www.npmjs.com/) or [Yarn](https://yarnpkg.com/) or [pnpm](https://pnpm.io/) or [Bun](https://bun.sh/)
-   [MongoDB](https://www.mongodb.com/) (local or cloud instance)

## 🚀 Installation

Follow these steps to set up the project locally:

1.  **Clone the repository:**
```bash
    git clone https://github.com/Rio-awsm/quick-ticketing.git
    cd quick-ticketing
    



```

2.  **Install dependencies:**

    

```bash
npm install
    # or
    yarn install
    # or
    pnpm install
    # or
    bun install


```

3.  **Set up environment variables:**

    Create a `.env.local` file in the root directory and add your MongoDB connection string:

    

```
    MONGODB_URI="your_mongodb_connection_string"
    



```

4.  **Run the development server:**

    

```bash
npm run dev
    # or
    yarn dev
    # or
    pnpm dev
    # or
    bun dev


```

5.  **Open your browser:**

    Navigate to `http://localhost:3000` to view the application.

## 💡 Usage Examples

Here are some examples of how to use key components in this project:

### Creating a Ticket Component

```typescript
import React from 'react';
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from '@/components/ui/card';

interface TicketProps {
  title: string;
  description: string;
  status: 'Open' | 'In Progress' | 'Closed';
}

const Ticket: React.FC<TicketProps> = ({ title, description, status }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>Status: {status}</CardDescription>
      </CardHeader>
      <CardContent>
        {description}
      </CardContent>
    </Card>
  );
};

export default Ticket;


```

### Using Radix UI Select

```typescript
import * as React from "react"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export function SelectDemo() {
  return (
    <Select>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a fruit" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="apple">Apple</SelectItem>
        <SelectItem value="banana">Banana</SelectItem>
        <SelectItem value="blueberry">Blueberry</SelectItem>
        <SelectItem value="grapes">Grapes</SelectItem>
        <SelectItem value="pineapple">Pineapple</SelectItem>
      </SelectContent>
    </Select>
  )
}


```

## 🎨 Styling and Theming

This project uses Tailwind CSS for styling. You can customize the theme by modifying the `tailwind.config.js` file.

To add custom styles, create a new CSS file in the `styles` directory and import it into your components.

## 📱 Responsive Design

The application is designed to be responsive and adapts to different screen sizes. Tailwind CSS's responsive modifiers are used extensively to achieve this.  Test the application on various devices to ensure optimal viewing experience.

## 🧪 Testing

To run tests (if any are implemented):

```bash
npm run test
# or

yarn test
# or

pnpm test
# or

bun test


```

*(Note: Add testing framework configurations and test scripts to the `package.json` file for real functionality)*

## 🚀 Deployment

You can deploy this Next.js app to platforms like Vercel, Netlify, or AWS Amplify.

**Deploy to Vercel:**

1.  Create a Vercel account.
2.  Install the Vercel CLI: `npm install -g vercel`
3.  Run `vercel` in your project directory and follow the prompts.

Check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## 🤝 Contributing

Contributions are welcome! Here's how you can contribute:

1.  Fork the repository.
2.  Create a new branch for your feature or bug fix.
3.  Make your changes and commit them with descriptive commit messages.
4.  Push your changes to your fork.
5.  Submit a pull request.

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Credits/Acknowledgments

-   Built with ❤️ by [Rio-awsm](https://github.com/Rio-awsm)
-   Powered by [Next.js](https://nextjs.org/)
-   UI Components by [Radix UI](https://www.radix-ui.com/)
-   Styled with [Tailwind CSS](https://tailwindcss.com/)
