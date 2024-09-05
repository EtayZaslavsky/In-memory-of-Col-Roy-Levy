import { tinaField } from "tinacms/dist/react";
import { Page, PageBlocks } from "../../tina/__generated__/types";
import { Hero } from "./hero";
import { Content } from "./content";
import { Features } from "./features";
import { Testimonial } from "./testimonial";
import { ImageGallery } from "./image-gallery";
import { Video } from "./video-card";
import { Image } from "./image-card";
import { Timeline } from "./timeline";
import { StoryForm } from "./story-form";
import { Stories } from "./stories";

export const Blocks = (props: Omit<Page, "id" | "_sys" | "_values">) => {
  return (
    <>
      {props.blocks
        ? props.blocks.map(function (block, i) {
          return (
            <div key={i} data-tina-field={tinaField(block)}>
              <Block {...block} />
            </div>
          );
        })
        : null}
    </>
  );
};

const Block = (block: PageBlocks) => {
  switch (block.__typename) {
    case "PageBlocksHero":
      return <Hero data={block} />;
    case "PageBlocksContent":
      return <Content data={block} />;
    case "PageBlocksFeatures":
      return <Features data={block} />;
    case "PageBlocksTestimonial":
      return <Testimonial data={block} />;
    case "PageBlocksImageGallery":
      return <ImageGallery data={block} />;
    case "PageBlocksVideo":
      return <Video data={block} />;
    case "PageBlocksImage":
      // @ts-ignore
      return <Image data={block} />;
    case "PageBlocksTimeline":
      return <Timeline data={block} />;
    case "PageBlocksStoryForm":
      return <StoryForm data={block} />;
    case "PageBlocksStories":
      // @ts-ignore
      return <Stories data={block} />;
    default:
      return null;
  }
};
