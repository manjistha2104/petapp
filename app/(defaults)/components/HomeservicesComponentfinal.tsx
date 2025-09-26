import React from "react";
import { useDrag, useDrop } from "react-dnd";

const ItemTypes = {
  BANNER: "BANNER",
};

const BannerRow = ({ banner, index, moveBanner, onDelete }) => {
  const ref = React.useRef(null);

  const [, drop] = useDrop({
    accept: ItemTypes.BANNER,
    hover(item) {
      if (!ref.current) return;
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) return;

      moveBanner(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.BANNER,
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(drop(ref));

  return (
    <div
      ref={ref}
      className={`flex items-center space-x-3 p-2 ${
        isDragging ? "opacity-50" : ""
      }`}
      style={{ cursor: "move" }}
    >
      <img src={banner.imageUrl} alt={banner.name} className="w-10 h-10" />
      <span>{banner.name}</span>
      <button
        onClick={() => onDelete(index)}
        className="ml-auto text-red-500"
      >
        Delete
      </button>
    </div>
  );
};

const HomeservicesComponent = ({ banners, setBanners, saveBannerSettings, onDelete }) => {
  const moveBanner = (fromIndex, toIndex) => {
    const updatedBanners = [...banners];
    const [movedBanner] = updatedBanners.splice(fromIndex, 1);
    updatedBanners.splice(toIndex, 0, movedBanner);
    setBanners(updatedBanners);
  };

  return (
    <div>
      {banners.map((banner, index) => (
        <BannerRow
          key={index}
          index={index}
          banner={banner}
          moveBanner={moveBanner}
          onDelete={onDelete}
        />
      ))}

      <button
        onClick={saveBannerSettings}
        className="mt-5 p-2 bg-blue-500 text-white rounded"
      >
        Save Settings
      </button>
    </div>
  );
};

export default HomeservicesComponent;
