export default {
  name: "List frames",
  key: "listFrames",

  async run($) {
    const frames = {
      data: [],
    };

    const boardId = $.step.parameters.boardId;

    if (typeof boardId !== "string" || boardId.trim() === "") {
      return { data: [] };
    }

    let next;
    do {
      try {
        const response = await $.http.get(`/v2/boards/${boardId}/items`);

        if (response.data && response.data.data && response.data.links) {
          const { data: itemData, links: linkData } = response.data;

          next = linkData.next;

          const allFrames = itemData.filter((item) => item.type === "frame");

          if (Array.isArray(allFrames) && allFrames.length) {
            for (const frame of allFrames) {
              if (frame.data && frame.data.title) {
                frames.data.push({
                  value: frame.id,
                  name: frame.data.title,
                });
              }
            }
          }
        }
      } catch (error) {
        // Handle error here
        console.error(error);
        return { data: [] };
      }
    } while (next);

    return frames;
  },
};
