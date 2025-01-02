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
                <Block label="running" />
                <Block label="total" />
                <Block label="unrecognized" />
                <Block label="series" />
            </Container>
        );
    }

    return (
        <Container service={service}>
            <Block label="running" value={t("common.number", { value: queueData[0].running })} />
            <Block label="total" value={t("common.number", { value: queueData[0].total })} />
            <Block label="unrecognized" value={t("common.number", { value: statsData[0].unrecognizedFiles })} />
            <Block label="series" value={t("common.number", { value: statsData[0].seriesCount })} />
        </Container>
    );
}
