import { useState } from "react"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import {
  Dialog,
  DialogContent,
  DialogOverlay,
  DialogPortal,
} from "@/components/ui/dialog"

interface Image {
  src: string
  caption: string
}

interface ImageCarouselProps {
  images: Image[]
}

export function ImageCarousel({ images }: ImageCarouselProps) {
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(0)

  const openModal = (index: number) => {
    setSelectedIndex(index)
    setModalOpen(true)
  }

  return (
    <>
      {/* Main Carousel */}
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent>
          {images.map((img, index) => (
            <CarouselItem key={index} className="md:basis-1/2">
              <div
                className="panel cursor-pointer overflow-hidden transition-all hover:border-terminal"
                onClick={() => openModal(index)}
              >
                <img
                  src={img.src}
                  alt={img.caption}
                  className="h-80 w-full object-cover transition-transform hover:scale-105"
                />
                <div className="p-3 text-[10px] text-muted-foreground">
                  {img.caption}
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-2" />
        <CarouselNext className="right-2" />
      </Carousel>

      {/* Modal with Carousel */}
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogPortal>
          <DialogOverlay className="bg-black/95" />
          <DialogContent className="max-w-[95vw] border-0 bg-transparent p-0 shadow-none md:max-w-[90vw]">
            <Carousel
              opts={{
                startIndex: selectedIndex,
                loop: true,
              }}
              className="w-full"
            >
              <CarouselContent>
                {images.map((img, index) => (
                  <CarouselItem key={index}>
                    <div className="flex flex-col items-center justify-center">
                      <img
                        src={img.src}
                        alt={img.caption}
                        className="max-h-[70vh] w-auto object-contain md:max-h-[80vh]"
                      />
                      <div className="mt-4 bg-black/70 px-6 py-3 text-xs text-foreground md:text-sm">
                        {img.caption}
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-4 h-10 w-10 border-border/50 bg-card/10 backdrop-blur-sm hover:border-terminal hover:bg-card/30 md:left-8" />
              <CarouselNext className="right-4 h-10 w-10 border-border/50 bg-card/10 backdrop-blur-sm hover:border-terminal hover:bg-card/30 md:right-8" />
            </Carousel>
          </DialogContent>
        </DialogPortal>
      </Dialog>
    </>
  )
}
