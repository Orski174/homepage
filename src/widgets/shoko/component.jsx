import { useTranslation } from "next-i18next";

import Container from "components/services/widget/container";
import Block from "components/services/widget/block";
import useWidgetAPI from "utils/proxy/use-widget-api";

export default function Component({ service }) {
    const { t } = useTranslation();
    const { widget } = service;
    const { data: queueData, error: queueError } = useWidgetAPI(widget, "queue");
    const { data: statsData, error: statsError } = useWidgetAPI(widget, "stats");

    if (queueError || statsError) {
        const finalError = queueError ?? statsError;
        return <Container service={service} error={finalError} />;
    }

    if (!queueData || !statsData) {
        return (
            <Container service={service}>
                <Block label="shoko.total" />
                <Block label="shoko.running" />
                <Block label="shoko.fileCount" />
                <Block label="shoko.seriesCount" />
                <Block label="shoko.unrecognizedFiles" />
            </Container>
        );
    }

    return (
        <Container service={service}>
            <Block label="shoko.total" value={t("common.number", { value: queueData.total })} />
            <Block label="shoko.running" value={t("common.number", { value: queueData.running })} />
            <Block label="shoko.fileCount" value={t("common.number", { value: statsData.fileCount })} />
            <Block label="shoko.seriesCount" value={t("common.number", { value: statsData.seriesCount })} />
            <Block label="shoko.unrecognizedFiles" value={t("common.number", { value: statsData.unrecognizedFiles })} />
        </Container>
    );
}