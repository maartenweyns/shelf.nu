import { useLoaderData } from "@remix-run/react";
import { Text, Flex, ProgressCircle } from "@tremor/react";
import { ClientOnly } from "remix-utils/client-only";
import type { loader } from "~/routes/_layout+/dashboard";
import { EmptyState } from "./empty-state";
import { InfoTooltip } from "../shared/info-tooltip";

export default function LocationRatioChart() {
  const { assets, totalAssets } = useLoaderData<typeof loader>();
  const assetsWithLocation = assets.filter((asset) => asset.locationId).length;

  return (
    <ClientOnly fallback={null}>
      {() => (
        <div className="w-full border border-gray-200 ">
          <div className="flex items-center justify-between">
            <div className="flex-1 border-b p-4 text-left text-[14px] font-semibold  text-gray-900 md:px-6">
              Location Ratio
            </div>
            <div className="border-b p-4 text-right text-[14px] font-semibold  text-gray-900 md:px-6">
              <InfoTooltip
                content={
                  <>
                    <h6>Location Ratio</h6>
                    <p>
                      This chart shows how much of your assets are in a defined
                      location
                    </p>
                  </>
                }
              />
            </div>
          </div>
          <div className="h-full p-8">
            {assetsWithLocation > 0 ? (
              <div className="space-y-3">
                <Flex
                  className="space-x-5"
                  justifyContent="evenly"
                  alignItems="end"
                >
                  <ProgressCircle
                    value={(assetsWithLocation / totalAssets) * 100}
                    size="xl"
                    color="orange"
                  >
                    <span className="block text-center text-xs font-medium text-gray-600">
                      Location Known <br />
                      <span className="block text-[14px] font-semibold leading-6 text-gray-900">
                        {assetsWithLocation}/{totalAssets} assets
                      </span>
                    </span>
                  </ProgressCircle>
                  <div>
                    <Text className="mb-2 !text-[14px] font-medium text-gray-600">
                      Location Ratio
                    </Text>
                    <Text className="mb-3 !text-[30px] font-semibold text-gray-900">
                      {`${((assetsWithLocation / totalAssets) * 100).toFixed(
                        2
                      )}%`}
                    </Text>
                  </div>
                </Flex>
              </div>
            ) : (
              <EmptyState text="No assets with values in database" />
            )}
          </div>
        </div>
      )}
    </ClientOnly>
  );
}