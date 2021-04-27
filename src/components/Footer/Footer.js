import React from "react";

export default function Footer() {


    return (
        <footer className="fixed-bottom text-center" variant="primary">
            <p>
                &copy; {new Date().getFullYear()} - MealBox
            </p>
        </footer>
    )
}