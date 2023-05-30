import '@testing-library/jest-dom'

import { renderComponent } from "@/lib/test/providers";
import Events from '@/pages/events';
import { mockEvents } from '@/lib/test/mock/events';


describe("Events page", () => {
    test("should render details correctly", () => {
        const screen = renderComponent(<Events posts={mockEvents}/>)
        screen.debug()
    })
})